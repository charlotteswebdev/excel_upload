import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function Form() {
  async function handleUpload(formData: FormData) {
    'use server'

    try {
      const file = formData.get("file") as File;
      if (!file) {
        throw new Error('No file selected');
      }

      const data = await file.arrayBuffer();
      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      console.log('Upload success:', result);
      return result;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  return (
    <div>
      <form action={handleUpload}>
        <TextField
          type="file"
          name="file"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachFileIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{
            accept: '.xlsx,.xls',
          }}
        />
        <Button type="submit" variant="contained">
          Upload
        </Button>
      </form>
    </div>
  );
}