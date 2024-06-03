import { Predictions } from '@aws-amplify/predictions';

import '@aws-amplify/ui-react/styles.css'
import { AuthUser } from "aws-amplify/auth";
import { Button, Flex, Heading, SelectField } from "@aws-amplify/ui-react";

import { downloadData, list } from 'aws-amplify/storage';

import { useState, useEffect } from 'react';

function Transcription({user} : {user: AuthUser | undefined}) {

    const getTranscription = async (fileUrl: string): Promise<{ fullText: string; }> => {

      const download = await downloadData({
        path: fileUrl,
        options: {
          // optional progress callback
          onProgress: (event) => {
            console.log(event.transferredBytes);
          }
        }
      }).result

      console.log(download);

        const blob = await download.body.blob()
        const buf = await blob.arrayBuffer()

        const mp3 = new Uint8Array(buf);
        const transcription = await Predictions.convert({
            transcription: {
                source: {
                    bytes: mp3
                }
            }
        });

        console.log(transcription);
        return transcription.transcription;
    }

    const [transcriptionReturn, setTranscriptionInformation] = useState("");
  
    const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);

    const [audioUrls, setAudioUrls] = useState<string[]>([]);
  
  const fetchAudioUrls = async () => {
    try {
      const result = await list({
        path: 'audio_files/'});
      const files = result.items.map(file => file.path);

      setAudioUrls(files);
    } catch (error) {
      console.error("Error fetching audio file URLs:", error);
    }
  };

  useEffect(() => {
    fetchAudioUrls();
  }, []);


  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(event.target.value);
  };

  const handleTranscription = async () => {
    if (selectedFile) {
      const transcription = await getTranscription(selectedFile);
      setTranscriptionInformation(transcription.fullText);
    }
  };

  return (
    <Flex margin="20em" alignSelf="center" direction="column">
      <h1>{user?.signInDetails?.loginId}</h1>
      <SelectField
        label="Choose a file"
        onChange={handleFileChange}
      ><option value="">Select a file</option>
      {audioUrls.map(file => (
        <option key={file} value={file}>{file}</option>
      ))}</SelectField>
      <Button onClick={handleTranscription}>Transcribe</Button>
      <Heading>{transcriptionReturn}</Heading>
    </Flex>
  );
}

export default Transcription;