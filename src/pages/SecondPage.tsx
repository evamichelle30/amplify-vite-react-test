import { StorageManager } from "@aws-amplify/ui-react-storage";
import '@aws-amplify/ui-react/styles.css'
import { AuthUser } from "aws-amplify/auth";
import { Flex } from "@aws-amplify/ui-react";

import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from "react";
import { list } from 'aws-amplify/storage';

function SecondPage({user} : {user: AuthUser | undefined}) {
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
  return (
    <Flex margin="20em" alignSelf="center" direction="column">
      <h1>{user?.signInDetails?.loginId}'s files</h1>
      <ul>
        {audioUrls.map((res) => (
          <li key={res}>{res}</li>
        ))}
      </ul>
        <div>
          <StorageManager
          acceptedFileTypes={['audio/*']}
          // path={({ identityId }) => `protected/${identityId}/`}
          path="audio_files/"
          maxFileCount={1}
          isResumable
        />
        </div>
    </Flex>
  );
}

export default SecondPage;
