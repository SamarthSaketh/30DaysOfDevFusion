export default function ToolLayout({ title, children }) {
  return (
    <div className="tool-container">
      <h2 className="tool-title">{title}</h2>
      {children}
    </div>
  );
}
