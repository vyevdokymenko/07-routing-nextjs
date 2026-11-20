"use client";

import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

function NotePreviewClient() {
  const [isModalShow, setIsModalShow] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  const { data: note, isSuccess } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    throwOnError: true,
  });

  const router = useRouter();

  const handleBackAction = () => {
    router.back();
  };

  const handleClose = () => {
    setIsModalShow(false);
    router.back();
  };

  return (
    <>
      {isModalShow && isSuccess && (
        <Modal onClose={handleClose}>
          <main className={css.main}>
            <div className={css.container}>
              <div className={css.item}>
                <button onClick={handleBackAction} className={css.backBtn}>
                  Back
                </button>
                <div className={css.header}>
                  <h2>{note.title}</h2>
                </div>
                <p className={css.tag}>{note.tag}</p>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{note.createdAt}</p>
              </div>
            </div>
          </main>
        </Modal>
      )}
    </>
  );
}

export default NotePreviewClient;
