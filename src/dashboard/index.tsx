import React, { useState } from "react";
import {
  Flex,
  Grid,
  Text,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { projects } from "../fixtures/projects";
import * as Styles from "./styles";

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");

  return (
    <Flex flexDirection={"column"} width={"100%"}>
      <Flex
        width={"100%"}
        padding={"20px"}
        bgColor={"rgb(255, 222, 64)"}
        boxShadow={"0px 5px 10px #e7cb50"}
      >
        <Text fontSize="2xl">Logglytics</Text>
        <Spacer />
        <Image
          cursor={"pointer"}
          padding={"0 10px"}
          src={
            "https://img.icons8.com/external-sbts2018-lineal-color-sbts2018/30/000000/external-logout-social-media-sbts2018-lineal-color-sbts2018.png"
          }
        />
      </Flex>
      <Flex
        flexDirection={"column"}
        width={"100%"}
        height={"calc(100vh - 76px)"}
        overflowY={"auto"}
      >
        <Text fontSize="2xl" padding={"20px"} marginTop={"15px"}>
          Your Projects
        </Text>
        <Grid
          gridTemplateColumns={"repeat(auto-fill, 250px)"}
          gridTemplateRows={"repeat(auto-fill, 200px)"}
          justifyContent={"space-between"}
          padding={"20px"}
        >
          <Styles.Card isCenter isCursor onClick={onOpen}>
            <AddIcon width={"30px"} height={"30px"} />
          </Styles.Card>
          {projects &&
            projects.map((project) => (
              <Styles.Card key={project.projectId} direction={"column"}>
                <Styles.CardTitle>{project.projectName}</Styles.CardTitle>
                <Styles.CardSubtitle>{project.platform}</Styles.CardSubtitle>
                <Spacer />
                <Flex justifyContent={"flex-end"} style={{ gap: "20px" }}>
                  <Styles.CardLink>OPEN</Styles.CardLink>
                  <DeleteIcon color="red.500" cursor={"pointer"} />
                </Flex>
              </Styles.Card>
            ))}
        </Grid>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Project</ModalHeader>
          <ModalCloseButton outlineColor={"yellow"} />
          <ModalBody>
            <Flex flexDirection={"column"} padding={"20px"}>
              <Input
                focusBorderColor={"rgb(255, 222, 64)"}
                placeholder={"Project Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin={"10px"}
                height={"50px"}
              />
              <Input
                focusBorderColor={"rgb(255, 222, 64)"}
                placeholder={"Platform"}
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                margin={"10px"}
                height={"50px"}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="yellow"
              mr={3}
              onClick={onClose}
              disabled={!name || !platform}
            >
              CREATE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Dashboard;
