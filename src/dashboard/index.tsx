import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
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
import {
  BASE_URL,
  deleteRequest,
  getRequest,
  postRequest,
} from "../services/http";
import * as Styles from "./styles";
import AuthContext from "../services/useAuth/context";
import { Redirect } from "react-router-dom";

function Dashboard() {
  const history = useHistory();
  const { auth, logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    if (!auth) return;
    getProjects();
  }, [auth]);

  if (!auth) {
    return <Redirect to={"/auth"} />;
  }

  const getProjects = async () => {
    const response = await getRequest(`${BASE_URL}/project`);
    if (response.status && !!response.data?.length) {
      setProjectList(response.data);
    } else {
      console.error(response.error);
    }
  };

  const createProject = async () => {
    onClose();
    const response = await postRequest(`${BASE_URL}/project`, {
      name,
      platform,
    });
    if (response.status) {
      getProjects();
    }
  };

  const deleteProject = async (id: string) => {
    const response = await deleteRequest(`${BASE_URL}/project/${id}`);
    if (response.status) {
      getProjects();
    }
  };

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
          onClick={() => logout()}
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
          {!!projectList.length &&
            projectList.map((project) => (
              <Styles.Card key={project.id} direction={"column"}>
                <Styles.CardTitle>{project.name}</Styles.CardTitle>
                <Styles.CardSubtitle>{project.platform}</Styles.CardSubtitle>
                <Spacer />
                <Flex justifyContent={"flex-end"} style={{ gap: "20px" }}>
                  <Styles.CardLink
                    onClick={() => history.push(`/project/${project.id}`)}
                  >
                    OPEN
                  </Styles.CardLink>
                  <DeleteIcon
                    color="red.500"
                    cursor={"pointer"}
                    onClick={() => deleteProject(project.id)}
                  />
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
              onClick={createProject}
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
