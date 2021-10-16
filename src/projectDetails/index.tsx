import React from "react";
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
} from "@chakra-ui/react";
import { events } from "../fixtures/events";
import { logs } from "../fixtures/logs";

function ProjectDetails() {
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
                    <Th>KEY</Th>
                    <Th>COUNT</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {events.map((event) => (
                    <Tr key={event.id}>
                      <Td>{event.key}</Td>
                      <Td>{event.count}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr></Tr>
                </Tfoot>
              </Table>{" "}
            </>
          ) : (
            <Text fontSize="1xl">No events created</Text>
          )}
        </Flex>
        <Flex flexDirection={"column"} marginTop={"50px"}>
          {logs ? (
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
                      <Td>{log.created}</Td>
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
