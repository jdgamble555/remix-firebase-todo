import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  type FirestoreDataConverter,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { useUser } from "./use-user";

export type TodoDoc = {
  id: string;
  uid: string;
  text: string;
  complete: boolean;
  createdAt: Date;
};

const todoConverter: FirestoreDataConverter<TodoDoc> = {
  toFirestore(todo) {
    return todo;
  },

  fromFirestore(snapshot) {
    const data = snapshot.data({ serverTimestamps: "estimate" });
    const createdAt = data.createdAt as Timestamp;

    return {
      id: snapshot.id,
      uid: data.uid,
      text: data.text,
      complete: data.complete,
      createdAt: createdAt.toDate(),
    };
  },
};

export const useTodos = () => {
  const user = useUser();
  const uid = user.data?.uid;
  const [todos, setTodos] = useState<{
    data: TodoDoc[];
    loading: boolean;
    error: string | null;
    uid: string | undefined;
  }>({ data: [], loading: true, error: null, uid: undefined });

  useEffect(() => {
    if (!uid) return;

    return onSnapshot(
      query(
        collection(db, "todos"),
        where("uid", "==", uid),
        orderBy("createdAt"),
      ).withConverter(todoConverter),
      (snapshot) => setTodos({
        data: snapshot.docs.map((item) => item.data()),
        loading: false,
        error: null,
        uid,
      }),
      (error) => setTodos({ data: [], loading: false, error: error.message, uid }),
    );
  }, [uid]);

  // Never expose a previous user's data while a new subscription starts.
  if (!uid) return { data: [], loading: false, error: null };
  if (todos.uid !== uid) return { data: [], loading: true, error: null };
  return todos;
};

export const generateText = () =>
  doc(collection(db, "todos")).id.substring(0, 10).toLowerCase();

export const addTodo = async (text: string) => {
  const user = auth.currentUser;

  if (!user) return { error: "No user" };
  if (!text.trim()) return { error: "Enter a task." };

  try {
    await setDoc(doc(collection(db, "todos")), {
      uid: user.uid,
      text: text.trim(),
      complete: false,
      createdAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    if (error instanceof FirestoreError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const updateTodo = async (id: string, complete: boolean) => {
  try {
    await updateDoc(doc(db, "todos", id), {
      complete,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    if (error instanceof FirestoreError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await deleteDoc(doc(db, "todos", id));
    return { error: null };
  } catch (error) {
    if (error instanceof FirestoreError) {
      return { error: error.message };
    }
    throw error;
  }
};
