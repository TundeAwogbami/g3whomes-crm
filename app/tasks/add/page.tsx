import { TaskForm } from "@/components/task-form"
import { addTask } from "@/app/tasks/action"
import { useFormState } from "react-dom"

export default function AddTaskPage() {
  const [state, formAction] = useFormState(addTask, null)

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center justify-center p-4 md:p-10">
      <TaskForm formAction={formAction} formState={state} />
    </div>
  )
}
