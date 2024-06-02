import { Predictions } from '@aws-amplify/predictions';

import '@aws-amplify/ui-react/styles.css'
import { AuthUser } from "aws-amplify/auth";
import { Flex } from "@aws-amplify/ui-react";

import { downloadData } from 'aws-amplify/storage';

import { useState, useEffect } from 'react';

function Transcription({user} : {user: AuthUser | undefined}) {
    const getTranscription = async (fileUrl: string): Promise<{ fullText: string; }> => {

      console.log("Hello from Transcription")
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

    const [transcriptionReturn, setTranscriptionInformation] = useState("nothing to see");

    useEffect(() => {
      console.log("hello from effect")
    getTranscription("https://amplify-d9agfyakfbx39-dev-myteststoragebucket1c77e-cwvnvnhvkxbq.s3.eu-north-1.amazonaws.com/audio_files/07+Lektion+2%2C+Text+9.mp3")
    .then(transcription =>
        setTranscriptionInformation(transcription.fullText)
    );
    }, [])

  return (
    <Flex margin="20em" alignSelf="center" direction="column">
      <h1>{user?.signInDetails?.loginId}</h1>
      <>{transcriptionReturn}</>
        <div>
          hello
        </div>
    </Flex>
  );
}

export default Transcription;