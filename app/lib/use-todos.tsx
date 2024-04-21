import {
    type DocumentData,
    onSnapshot,
    type QuerySnapshot,
    Firestore,
    Timestamp
} from 'firebase/firestore';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';

import { useFirebase } from './firebase';
import { FormEvent, useEffect, useState } from 'react';
import { useUser } from './use-user';

export type TodoItem = {
    id: string;
    text: string;
    complete: boolean;
    created: Date;
    uid: string;
};

export const snapToData = (
    q: QuerySnapshot<DocumentData, DocumentData>
) => {

    // creates todo data from snapshot
    if (q.empty) {
        return [];
    }
    return q.docs.map((doc) => {
        const data = doc.data({
            serverTimestamps: 'estimate'
        });
        const created = data.created as Timestamp;
        return {
            ...data,
            created: created.toDate(),
            id: doc.id
        }
    }) as TodoItem[];
}


export function useTodos(
    _user: ReturnType<typeof useUser>
) {

    const { db } = useFirebase();

    const _store = useState<{
        todos: TodoItem[],
        loading: boolean
    }>({
        todos: [],
        loading: true
    });

    const user = _user[0];

    const setTodos = _store[1];

    useEffect(() => {

        setTodos(v => ({ ...v, loading: true }));

        if (!user.data) {
            setTodos({ loading: false, todos: [] });
            return;
        }

        if (!db) {
            return;
        }

        return onSnapshot(

            // query realtime todo list
            query(
                collection(db, 'todos'),
                where('uid', '==', user.data.uid),
                orderBy('created')
            ), (q) => {

                // get data, map to todo type
                const data = snapToData(q);

                /**
                 * Note: Will get triggered 2x on add 
                 * 1 - for optimistic update
                 * 2 - update real date from server date
                 */

                // print data in dev mode
                /*if (process.env.NODE_ENV === 'development') {
                    console.log(data);
                }*/

                // add to store
                setTodos({ loading: false, todos: data });

            });

    }, [setTodos, user.data, db]);

    return _store[0];
}

export const addTodo = (
    e: FormEvent<HTMLFormElement>,
    uid: string,
    db: Firestore | null
) => {

    e.preventDefault();

    if (!db) {
        return;
    }
    // get and reset form
    const target = e.target as HTMLFormElement;
    const form = new FormData(target);
    const { task } = Object.fromEntries(form);

    if (typeof task !== 'string') {
        return;
    }

    // reset form
    target.reset();

    addDoc(collection(db, 'todos'), {
        uid,
        text: task,
        complete: false,
        created: serverTimestamp()
    });
}

export const updateTodo = (
    id: string,
    complete: boolean,
    db: Firestore | null
) => {
    if (!db) {
        return;
    }
    updateDoc(doc(db, 'todos', id), { complete });
}

export const deleteTodo = (
    id: string,
    db: Firestore | null
) => {
    if (!db) {
        return;
    }
    deleteDoc(doc(db, 'todos', id));
}