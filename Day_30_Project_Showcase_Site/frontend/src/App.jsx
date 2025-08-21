import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppShell,
  Container,
  Grid,
  Button,
  Modal,
  TextInput,
  NumberInput,
  Group,
  ActionIcon,
  Title,
  Text,
  useMantineColorScheme,
  Paper,
  Stack,
  MantineProvider,
  Box,
  Divider,
  Chip,
  Avatar,
  Tooltip,
  Card,
  Badge,
  Transition,
  Center,
  rem,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useHotkeys } from "@mantine/hooks";
import { IconSun, IconMoon, IconCalendar, IconEdit, IconTrash, IconPlus, IconBrandGithub, IconLink } from "@tabler/icons-react";
import ReactQuill, { Quill } from "react-quill";
import dayjs from "dayjs";
import "@mantine/dates/styles.css";
import "react-quill/dist/quill.snow.css";
import ProjectCard from "./components/ProjectCard.jsx";
import { Stepper } from "@mantine/core";

// Clipboard to remove Markdown stars on paste
const Clipboard = Quill.import("modules/clipboard");
class PlainClipboard extends Clipboard {
  onPaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain").replace(/\*\*/g, "");
    const range = this.quill.getSelection();
    this.quill.insertText(range.index, text);
    this.quill.setSelection(range.index + text.length);
  }
}
Quill.register("modules/clipboard", PlainClipboard, true);

export default function App() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const [newProject, setNewProject] = useState({
    day: "",
    title: "",
    date: null,
    description: "",
    techStack: "",
    github: "",
    liveDemo: "",
  });

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data.sort((a, b) => a.day - b.day)))
      .catch((err) => console.error(err));
  };

  const validate = () => {
    const newErrors = {};
    if (!newProject.day) newErrors.day = "Day is required";
    if (!newProject.title) newErrors.title = "Title is required";
    if (!newProject.date) newErrors.date = "Date is required";
    if (!newProject.description || newProject.description === "<p><br></p>")
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProject = () => {
    if (!validate()) return;

    const payload = {
      ...newProject,
      date: newProject.date ? newProject.date.toISOString() : null,
      techStack: newProject.techStack
        ? newProject.techStack.split(",").map((t) => t.trim())
        : [],
    };

    const request = isEdit
      ? axios.put(`http://localhost:5000/api/projects/${editingProjectId}`, payload)
      : axios.post("http://localhost:5000/api/projects", payload);

    request
      .then(() => {
        fetchProjects();
        closeModal();
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (project) => {
    setIsEdit(true);
    setEditingProjectId(project._id);
    setNewProject({
      day: project.day,
      title: project.title,
      date: project.date ? new Date(project.date) : null,
      description: project.description,
      techStack: project.techStack.join(", "),
      github: project.github || "",
      liveDemo: project.liveDemo || "",
    });
    setShowModal(true);
    setActiveStep(0); // reset stepper
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      axios
        .delete(`http://localhost:5000/api/projects/${id}`)
        .then(() => fetchProjects())
        .catch((err) => console.error(err));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEdit(false);
    setEditingProjectId(null);
    setActiveStep(0);
    setNewProject({
      day: "",
      title: "",
      date: null,
      description: "",
      techStack: "",
      github: "",
      liveDemo: "",
    });
    setErrors({});
  };

  const handleAddProjectClick = () => {
    closeModal();
    setShowModal(true);
  };

  const headerGradient = dark
    ? "linear-gradient(90deg, rgba(26,27,30,0.96) 55%, rgba(44,46,51,0.95) 100%)"
    : "linear-gradient(90deg, rgba(120,235,215,0.85) 40%, rgba(172,182,229,0.84) 100%)";

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
    clipboard: true,
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "color",
    "background",
    "list",
    "bullet",
    "link",
  ];

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: dark ? "dark" : "light",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        headings: { fontFamily: "'Inter', 'Segoe UI', sans-serif" },
      }}
      zIndex={{
        modal: 2000,
        popover: 2500,
        dropdown: 2300,
        tooltip: 3000,
      }}
    >
      {/* Enhanced Sticky Header */}
      <Paper
        withBorder
        shadow="xl"
        radius="lg"
        p="lg"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1500,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: headerGradient,
          marginBottom: 24,
          backdropFilter: "blur(12px)",
          border: dark ? "1px solid #25262b" : "1px solid #eef2fd",
          transition: "background 0.3s",
        }}
      >
        <Group spacing="md" align="center">
          <Stack spacing={0}>
            <Title order={2} style={{ marginBottom: rem(3), cursor: "default", letterSpacing: "-0.5px" }}>
              🚀 DevFusion Projects Showcase
            </Title>
            <Text size="md" color={dark ? "gray.4" : "gray.7"}>
              30 Days of DevFusion Journey 🌟
            </Text>
          </Stack>
        </Group>
        <Group spacing="md">
          <Tooltip label={dark ? "Switch to light" : "Switch to dark"} withArrow>
            <ActionIcon
              variant="gradient"
              gradient={{ from: "yellow", to: dark ? "blue" : "orange", deg: 40 }}
              onClick={toggleColorScheme}
              size={40}
              radius="lg"
              style={{ boxShadow: "0 3px 15px rgba(0,0,0,0.10)" }}
            >
              {dark ? <IconSun size={22} /> : <IconMoon size={22} />}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Paper>

      <AppShell padding="md">
        <Container size="lg" py="xl">
          <Grid mt="lg">
            {projects.map((project) => (
              <Transition mounted transition="fade" duration={300} key={project._id}>
                {(styles) => (
                  <Grid.Col xs={12} sm={6} md={4} lg={4} style={styles}>
                    <Card
                      shadow="md"
                      radius="lg"
                      p="lg"
                      withBorder
                      style={{
                        background: dark
                          ? "linear-gradient(120deg, rgba(51,47,86,0.90), rgba(36,44,67,0.88) 95%)"
                          : "linear-gradient(120deg, rgba(240,239,255,0.98), rgba(220,231,254,0.96) 95%)",
                        minHeight: 280,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        position: "relative",
                        overflow: "visible"
                      }}
                    >
                      <Group position="apart">
                        <Badge color="blue" size="md" variant="light">Day {project.day}</Badge>
                        <Group spacing={8}>
                          <Tooltip label="Edit">
                            <ActionIcon color="blue" variant="light" size="lg" radius="xl" onClick={() => handleEdit(project)}>
                              <IconEdit size={20} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete">
                            <ActionIcon color="red" variant="light" size="lg" radius="xl" onClick={() => handleDelete(project._id)}>
                              <IconTrash size={20} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Group>
                      <Divider my={10}/>
                      <Text weight={600} size="lg" mb={6}>{project.title}</Text>
                      <Text size="sm" color="dimmed" mb={4}>{dayjs(project.date).format("MMMM D, YYYY")}</Text>
                      <Text size="sm" mb={8} dangerouslySetInnerHTML={{ __html: project.description }} />
                      <Group position="apart" mt="auto">
                        <Chip.Group>
                          {project.techStack && project.techStack.map((tech, idx) => (
                            <Chip key={idx} color="grape" size="xs" style={{ marginRight: rem(4) }}>
                              {tech}
                            </Chip>
                          ))}
                        </Chip.Group>
                        <Group spacing={8}>
                          {project.github && (
                            <Tooltip label="Github Repository">
                              <ActionIcon
                                color="gray"
                                radius="xl"
                                component="a"
                                href={project.github}
                                target="_blank"
                                variant="subtle"
                              >
                                <IconBrandGithub size={18} />
                              </ActionIcon>
                            </Tooltip>
                          )}
                          {project.liveDemo && (
                            <Tooltip label="Live Demo">
                              <ActionIcon
                                color="green"
                                radius="xl"
                                component="a"
                                href={project.liveDemo}
                                target="_blank"
                                variant="subtle"
                              >
                                <IconLink size={18}/>
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </Group>
                      </Group>
                    </Card>
                  </Grid.Col>
                )}
              </Transition>
            ))}
          </Grid>
        </Container>
      </AppShell>

      {/* Floating Add Button */}
      <Button
        leftSection={<IconPlus size={20} />}
        color="teal"
        size="xl"
        radius="xl"
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 2500,
          boxShadow: "0 4px 18px rgba(0,0,0,0.12)"
        }}
        onClick={handleAddProjectClick}
      >
        Add Project
      </Button>

      {/* Advanced Glassmorphic Modal / Stepper */}
      <Transition mounted={showModal} transition="scale-y" duration={350}>
        {(styles) => (
          <Modal
            opened={showModal}
            onClose={closeModal}
            title={isEdit ? "Edit Project" : "Add New Project"}
            size="lg"
            zIndex={2000}
            overlayProps={{ blur: 9, opacity: 0.2, color: dark ? "#22223b" : "#bee3ff" }}
            styles={{
              modal: {
                backdropFilter: "blur(24px)",
                background: dark
                  ? "linear-gradient(130deg, rgba(32,32,51,0.80), rgba(21,25,40,0.85) 100%)"
                  : "linear-gradient(130deg, rgba(240,246,255,0.90), rgba(210,224,240,0.92) 100%)",
                border: dark ? "1px solid #34365e" : "1px solid #deeaff"
              }
            }}
          >
            <Stepper
              active={activeStep}
              onStepClick={setActiveStep}
              breakpoint="sm"
              size="md"
              color="teal"
              mb={24}
              iconPosition="left"
            >
              <Stepper.Step label="Basics" description="Day/Title">
                <Stack spacing="md">
                  <NumberInput
                    label="Day"
                    value={newProject.day}
                    onChange={(val) => setNewProject({ ...newProject, day: val })}
                    required
                    error={errors.day}
                  />
                  <TextInput
                    label="Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.currentTarget.value })}
                    required
                    error={errors.title}
                  />
                  <Group position="apart" mt={4}>
                    <Button color="gray" onClick={closeModal}>Cancel</Button>
                    <Button color="teal" disabled={!newProject.day || !newProject.title} onClick={() => setActiveStep(1)}>Next</Button>
                  </Group>
                </Stack>
              </Stepper.Step>
              <Stepper.Step label="Date" description="Project Date">
                <Stack spacing="md">
                  <Box style={{ overflow: "visible" }}>
                    <DatePickerInput
                      label="Date"
                      placeholder="Pick project date"
                      value={newProject.date instanceof Date ? newProject.date : null}
                      onChange={(val) => setNewProject({ ...newProject, date: val })}
                      required
                      error={errors.date}
                      rightSection={<IconCalendar size={18} />}
                      withinPortal={true}
                      dropdownType="popover"
                      popoverProps={{
                        zIndex: 2500
                      }}
                      style={{ width: "100%" }}
                    />
                  </Box>
                  <Group position="apart" mt={4}>
                    <Button color="gray" onClick={closeModal}>Cancel</Button>
                    <Button color="teal" disabled={!newProject.date} onClick={() => setActiveStep(2)}>Next</Button>
                  </Group>
                </Stack>
              </Stepper.Step>
              <Stepper.Step label="Description" description="What is it?">
                <Stack spacing="md">
                  <div>
                    <Text mb={4}>Description</Text>
                    <ReactQuill
                      theme="snow"
                      value={newProject.description}
                      onChange={(val) => setNewProject({ ...newProject, description: val })}
                      modules={quillModules}
                      formats={quillFormats}
                      style={{ height: 130, marginBottom: 10, borderRadius: rem(6) }}
                    />
                    {errors.description && (
                      <Text color="red" size="sm">{errors.description}</Text>
                    )}
                  </div>
                  <Group position="apart" mt={4}>
                    <Button color="gray" onClick={closeModal}>Cancel</Button>
                    <Button color="teal" disabled={!newProject.description || newProject.description === "<p><br></p>"} onClick={() => setActiveStep(3)}>Next</Button>
                  </Group>
                </Stack>
              </Stepper.Step>
              <Stepper.Step label="Stack/Links" description="Tech & Links">
                <Stack spacing="md">
                  <TextInput
                    label="Tech Stack (comma-separated)"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({ ...newProject, techStack: e.currentTarget.value })}
                  />
                  <TextInput
                    label="GitHub Link"
                    leftSection={<IconBrandGithub size={17}/>}
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.currentTarget.value })}
                  />
                  <TextInput
                    label="Live Demo Link"
                    leftSection={<IconLink size={17}/>}
                    value={newProject.liveDemo}
                    onChange={(e) => setNewProject({ ...newProject, liveDemo: e.currentTarget.value })}
                  />
                  <Group position="apart" mt={4}>
                    <Button color="gray" onClick={closeModal}>Cancel</Button>
                    <Button color="teal" onClick={handleSaveProject}>
                      {isEdit ? "Update Project" : "Save Project"}
                    </Button>
                  </Group>
                </Stack>
              </Stepper.Step>
            </Stepper>
          </Modal>
        )}
      </Transition>
    </MantineProvider>
  );
}




