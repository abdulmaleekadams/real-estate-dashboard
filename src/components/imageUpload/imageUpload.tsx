/* eslint-disable react/no-unescaped-entities */
'use client';
import { useDropzone } from 'react-dropzone';
import styles from './imageUpload.module.scss';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { readFile } from '@/helpers/readFile';
import { set } from 'mongoose';

const ImageUpload = () => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = () => {
      setPreview(file.result);
      setPhotoUrl(file.result);
    };

    acceptedFiles?.length && file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | Blob | null>(
    null
  );


  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        'image/*': [],
      },
      maxFiles: 1,
      maxSize: 1024 * 1000,
      onDrop,
    });

  useEffect(
    () => () => {
      // Make sure to revoke the Object URL to avoid memory leaks
      acceptedFiles.forEach((file) => URL.revokeObjectURL(file.name));
    },
    [acceptedFiles]
  );

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps({ name: 'photo' })} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>Drag 'n' drop some file here, or click to select files</p>
      )}
      {preview && (
        <Image
          width={170}
          height={170}
          objectFit='cover'
          src={preview as string}
          alt='upload preview'
        />
      )}
    </div>
  );
};

export default ImageUpload;
