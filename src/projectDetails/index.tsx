import React, { useContext, useEffect, useState } from "react";
import {
  Flex,
  Text,
  Spacer,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { logs } from "../fixtures/logs";
import AuthContext from "../services/useAuth/context";
import { Redirect, useParams } from "react-router-dom";
import { BarChart, XAxis, Tooltip, Bar } from "recharts";
import { getRequest, BASE_URL } from "../services/http";

function ProjectDetails() {
  const { auth, logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const [events, setEvents] = useState<
    {
      id: string;
      key: string;
      count: string;
    }[]
  >([]);
  const [logs, setLogs] = useState<
    {
      id: string;
      type: string;
      message: string;
      created: number;
    }[]
  >([]);
  const [config, setConfig] = useState({});

  useEffect(() => {
    if (!auth) return;
    fetchEvents();
  }, [auth]);

  const fetchEvents = async () => {
    const response = await getRequest(`${BASE_URL}/event/${projectId}`);
    const logs = await getRequest(`${BASE_URL}/log/${projectId}`);
    const config = await getRequest(`${BASE_URL}/project/config/${projectId}`);
    if (config.status) {
      setConfig(config.data);
    }
    if (logs.status) {
      setLogs(logs.data);
    }
    if (response.status && !!response.data?.length) {
      setEvents(response.data);
    } else {
      console.error(response.error);
    }
  };

  if (!auth) {
    return <Redirect to={"/auth"} />;
  }
  return (
    <Flex flexDirection={"column"} width={"100%"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configuration</ModalHeader>
          <ModalCloseButton outlineColor={"yellow"} />
          <ModalBody>
            <Flex flexDirection={"column"} className={"code"} padding={"20px"}>
              {JSON.stringify(config)}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={() => onClose()}>
              DONE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        width={"100%"}
        padding={"20px"}
        bgColor={"rgb(255, 222, 64)"}
        boxShadow={"0px 5px 10px #e7cb50"}
      >
        <Text fontSize="2xl">Logglytics</Text>
        <Spacer />
        <Button onClick={() => onOpen()}>Config</Button>
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
        width={"100%"}
        height={"calc(100vh - 76px)"}
        overflowY={"auto"}
        justifyContent={"space-around"}
      >
        <Flex flexDirection={"column"} marginTop={"50px"}>
          {events ? (
            <>
              <Text fontSize="1xl" textAlign={"center"} fontWeight={"bold"}>
                Events
              </Text>
              <BarChart
                width={400}
                height={400}
                data={events}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="key" />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#ff7300"
                  stroke="#ff7300"
                  yAxisId={0}
                />
              </BarChart>
            </>
          ) : (
            <Text fontSize="1xl">No events created</Text>
          )}
        </Flex>
        <Flex flexDirection={"column"} marginTop={"50px"}>
          {logs?.length ? (
            <>
              <Text fontSize="1xl" textAlign={"center"} fontWeight={"bold"}>
                Logs
              </Text>
              <Table
                variant="striped"
                colorScheme="yellow"
                width={"max-content"}
                alignItems={"center"}
                border={"1px solid brown"}
                marginTop={"20px"}
              >
                <Thead>
                  <Tr>
                    <Th>TYPE</Th>
                    <Th>MESSAGE</Th>
                    <Th>CREATED</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {logs.map((log) => (
                    <Tr key={log.id}>
                      <Td>{log.type}</Td>
                      <Td>{log.message}</Td>
                      <Td>{new Date(log.created).toDateString()}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr></Tr>
                </Tfoot>
              </Table>
            </>
          ) : (
            <Text fontSize="1xl">No logs created</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProjectDetails;
