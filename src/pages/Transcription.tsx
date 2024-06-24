import '@aws-amplify/ui-react/styles.css'
import { AuthUser } from "aws-amplify/auth";
import { Button, Flex, Heading, SelectField } from "@aws-amplify/ui-react";

import { downloadData, list } from 'aws-amplify/storage';
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

import { useState, useEffect } from 'react';
import { LanguageCode, MediaFormat, StartTranscriptionJobCommand, StartTranscriptionJobCommandOutput, TranscribeClient } from "@aws-sdk/client-transcribe";
import { Amplify } from 'aws-amplify';

function Transcription({user} : {user: AuthUser | undefined}) {

const REGION = "eu-north-1";
const identityPoolId = Amplify.getConfig().Auth?.Cognito.identityPoolId;
if (!identityPoolId) {
  throw new Error('Cognito Identity Pool ID is not defined in the configuration.');
}
const CREDENTIALS = fromCognitoIdentityPool({
  clientConfig: { region: REGION },
  identityPoolId: identityPoolId,
});

const bucket = "amplify-d9agfyakfbx39-dev-myteststoragebucket1c77e-cwvnvnhvkxbq"

const transcribeClient = new TranscribeClient({ region: REGION, credentials: CREDENTIALS });

    const getTranscription = async (fileUrl: string): Promise<StartTranscriptionJobCommandOutput | undefined> => {

      const download = await downloadData({
        path: fileUrl,
        options: {
          onProgress: (event) => {
            console.log(event.transferredBytes);
          }
        }
      }).result

      console.log(download);

      const params = {
        TranscriptionJobName: "test_transcription_"+ fileUrl.replace(" ", ""),
        LanguageCode: LanguageCode.RU_RU, // For example, 'en-US'
        MediaFormat: MediaFormat.MP3, // For example, 'wav'
        Media: {
          MediaFileUri: "s3://" + bucket + "/" + fileUrl,
        },
        OutputBucketName: bucket
      };

      try {
        const transcription = await transcribeClient.send(
          new StartTranscriptionJobCommand(params)
        );
        console.log("Success - put", transcription);
        return transcription;
      } catch (err) {
        console.log("Error", err);
      }

        // const blob = await download.body.blob()
        // const buf = await blob.arrayBuffer()

        // const mp3 = new Uint8Array(buf);
        // const transcription = await Predictions.convert({
        //     transcription: {
        //         source: {
        //             bytes: mp3
        //         }
        //     }
        // });

        // console.log(transcription);
        // return transcription.transcription;
    }

    const [transcriptionReturn, setTranscriptionInformation] = useState<string | undefined>("");
  
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
      setTranscriptionInformation(transcription?.TranscriptionJob?.Transcript?.RedactedTranscriptFileUri);
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