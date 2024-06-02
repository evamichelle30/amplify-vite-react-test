import React from "react";
import { uploadData } from "aws-amplify/storage";
import '@aws-amplify/ui-react/styles.css'
import { AuthUser } from "aws-amplify/auth";
import { Flex } from "@aws-amplify/ui-react";

import '@aws-amplify/ui-react/styles.css';

function SecondPage({user} : {user: AuthUser | undefined}) {

    const [file, setFile] = React.useState();

    const handleChange = (event: any) => {
        setFile(event.target.files[0]);
    };

  return (
    <Flex margin="20em" alignSelf="center" direction="column">
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
        <div>
            <input type="file" onChange={handleChange} />
            <button
                onClick={() =>
                    uploadData({
                        path: `audio_files/${file.name}`,
                        data: file,
                    })
                }
            >
                Upload mp3
            </button>
        </div>
      <div>
        🥳 
        <br />
      </div>
    </Flex>
  );
}

export default SecondPage;
