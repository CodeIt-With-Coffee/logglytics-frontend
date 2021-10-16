import React from "react";
import { Flex, Text, Spacer } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { projects } from "./fixtures/projects";
import * as Styles from "./styles";

function App() {
  return (
    <Flex flexDirection={"column"} width={"100%"}>
      <Flex
        width={"100%"}
        padding={"20px"}
        bgColor={"rgb(255, 222, 64)"}
        boxShadow={"0px 5px 10px #e7cb50"}
      >
        <Text fontSize="2xl">Logglytics</Text>
      </Flex>
      <Flex
        width={"100%"}
        height={"calc(100vh - 76px)"}
        flexWrap={"wrap"}
        padding={"20px"}
      >
        <Styles.Card isCenter isCursor>
          <AddIcon />
        </Styles.Card>
        {projects &&
          projects.map((project) => (
            <Styles.Card key={project.projectId} direction={"column"}>
              <Styles.CardTitle>{project.projectName}</Styles.CardTitle>
              <Styles.CardSubtitle>{project.platform}</Styles.CardSubtitle>
              <Spacer />
              <Styles.CardLink>OPEN</Styles.CardLink>
            </Styles.Card>
          ))}
      </Flex>
    </Flex>
  );
}

export default App;
