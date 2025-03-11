import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Button, Card, Collection, Flex, Heading, Menu, MenuItem, ThemeProvider, useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  const [tools, setTools] = useState<Array<Schema["Tool"]["type"]>>([]);

  const { signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Tool.list().then((data) => setTools(data.data));
  }, []);

  function createTools() {
    client.models.Tool.create({ name: "Bulk Column Creator/Updater", slug: "bulk-column-creator-updater", summary: "This tool will bulk update column properties across many sheets with the same column, or will optionally add the column if not found." })
    client.models.Tool.create({ name: "Resource Management Date Shifter", slug: "rm-date-shifter", summary: "This tool will shift all the dates in your Resource Management Account by a specified number of days." })
    client.models.Tool.create({ name: "Demo Customizer Tool", slug: "demo-customizer", summary: "This tool will do a mass find & replace of tags added to a demo, and allow you to undo the changes later. It can also perform other customizations to demos if specified in a config sheet." })
    client.models.Tool.create({ name: "Workspace/Folder Content Printer", slug: "space-content-printer", summary: "Given a container, this script will return a list of every item within the container (and items within subfolders) indented to match the container hierarchy." }) 
    client.models.Tool.create({ name: "Rename Columns to Match Top Row", slug: "rename-columns-to-match-top-row", summary: "This tool takes a source sheet, then renames all the columns on the sheet to match whatever is in the top row." })
    client.models.Tool.create({ name: "Column ID Checker", slug: "column-id-checker", summary: "This tool will list the IDs of all the columns on a sheet. This can be useful for troubleshooting premium apps." })
    client.models.Tool.create({ name: "Work Breakdown Structure Creator", slug: "work-breakdown-structure-creator", summary: "Creates column formula columns to generate a Work Breakdown Structure on your sheet." })
  }

  return (
    <ThemeProvider>
      <main>
        <Flex>
          <Menu
            menuAlign="start"
          >
            <MenuItem onClick={() => alert('Settings')}>
              Settings
            </MenuItem>
            <MenuItem onClick={signOut}>
              Sign Out
            </MenuItem>
          </Menu>
          <Heading level={3}>Demo Solutions Toolkit</Heading>
        </Flex>
        <br></br>
        <Collection
          items={tools}
          type="list"
          direction="row"
          gap="20px"
          wrap="wrap"
        >
          {(tool, index) => (
            <Card
              key={index}
              borderRadius="medium"
              maxWidth="20rem"
              variation="outlined"
            >
              <Heading>{tool.name}</Heading>
              <p>{tool.summary}</p>
            </Card>
          )}
        </Collection>
        <br></br>
        <Button
          color="primary"
          onClick={createTools}>Create Tools
        </Button>
      </main>
    </ThemeProvider>
  );
}

export default App;
