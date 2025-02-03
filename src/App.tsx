import "./App.css";

import { KanbanBoard } from "@/components/KanbanBoard/KanbanBoard";
import { useTask } from "@/store";

function App() {
  const tasks = useTask();

  return <KanbanBoard tasks={tasks} />;
}

export default App;
