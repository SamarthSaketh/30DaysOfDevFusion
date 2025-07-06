import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JSONFormatter from "./tools/JSONFormatter";
import JWTDecoder from "./tools/JWTDecoder";
import UUIDGenerator from "./tools/UUIDGenerator";
import Base64Tool from "./tools/Base64Tool";
import RegexTester from "./tools/RegexTester";
import HtmlMarkdownConverter from "./tools/HtmlMarkdownConverter";
import JSONtoCSVConverter from "./tools/JSONtoCSVConverter";
import ColorPicker from "./tools/ColorPicker";
import TextCaseConverter from "./tools/TextCaseConverter";
import FileToBase64 from "./tools/FileToBase64";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/json-formatter" element={<JSONFormatter />} />
        <Route path="/jwt-decoder" element={<JWTDecoder />} />
        <Route path="/uuid-generator" element={<UUIDGenerator />} />
        <Route path="/base64-tool" element={<Base64Tool />} />
        <Route path="/regex-tester" element={<RegexTester />} />
        <Route path="/html-markdown" element={<HtmlMarkdownConverter />} />
        <Route path="/json-to-csv" element={<JSONtoCSVConverter />} />
        <Route path="/color-picker" element={<ColorPicker />} />
        <Route path="/text-case-converter" element={<TextCaseConverter />} />
        <Route path="/file-to-base64" element={<FileToBase64 />} />

        
      </Routes>
    </Router>
  );
}

export default App;
