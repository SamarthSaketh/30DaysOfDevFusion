import React from "react";
import {
  Card,
  Badge,
  Button,
  Group,
  Text,
  Stack,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { FaEdit, FaTrash, FaGithub, FaGlobe } from "react-icons/fa";

// 🎨 Tech stack colors
const techColors = {
  React: "blue",
  Python: "yellow",
  JavaScript: "orange",
  VanillaJS: "indigo",
  Node: "green",
  Express: "grape",
  Django: "teal",
  Flask: "gray",
  MongoDB: "lime",
  PostgreSQL: "cyan",
  MySQL: "pink",
  HTML: "red",
  CSS: "violet",
  Bootstrap: "purple",
  Tailwind: "cyan",
  Azure: "blue",
  TensorFlow: "orange",
  PyTorch: "red",
  Keras: "pink",
  ScikitLearn: "yellow",
  OpenCV: "grape",
  Git: "orange",
  GitHub: "dark",
  Postman: "yellow",
  VSCode: "blue",
  Default: "gray",
};

function ProjectCard({ project, onEdit, onDelete }) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="lg"
      withBorder
      style={{
        marginBottom: 20,
        backgroundColor: isDark ? theme.colors.dark[7] : theme.white,
        color: isDark ? theme.colors.gray : theme.black,
        transition: "all 0.3s ease",
      }}
    >
      <Stack gap="xs">
        {/* Title and Day */}
        <Text fw={700} size="lg">
          Day {project.day} – {project.title}
        </Text>

        {/* Date */}
        {project.date && (
          <Text c="dimmed" size="sm">
            {project.date}
          </Text>
        )}

        {/* Tech Stack badges */}
        <Group gap={6} mt="xs">
          {project.techStack?.map((tech, idx) => (
            <Badge
              key={idx}
              color={techColors[tech] || techColors.Default}
              variant={isDark ? "light" : "filled"}
              radius="sm"
              style={{
                cursor: "default",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 0 10px rgba(255,255,255,0.4)"
                  : "0 0 10px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {tech}
            </Badge>
          ))}
        </Group>

        {/* Description */}
        <div
          dangerouslySetInnerHTML={{ __html: project.description }}
          style={{ marginTop: 10 }}
        />

        {/* Buttons: GitHub / Live Demo */}
        <Group gap="sm" mt="sm">
          {project.github && (
            <Button
              variant="outline"
              color={isDark ? "gray" : "dark"}
              size="xs"
              leftSection={<FaGithub />}
              component="a"
              href={project.github}
              target="_blank"
            >
              GitHub
            </Button>
          )}
          {project.liveDemo && (
            <Button
              variant="outline"
              color="blue"
              size="xs"
              leftSection={<FaGlobe />}
              component="a"
              href={project.liveDemo}
              target="_blank"
            >
              Live Demo
            </Button>
          )}
        </Group>

        {/* Edit/Delete */}
        <Group justify="flex-end" gap="sm" mt="sm">
          <Button
            variant="subtle"
            color="orange"
            leftSection={<FaEdit />}
            size="xs"
            onClick={() => onEdit(project)}
          >
            Edit
          </Button>
          <Button
            variant="subtle"
            color="red"
            leftSection={<FaTrash />}
            size="xs"
            onClick={() => onDelete(project._id)}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}

export default ProjectCard;
