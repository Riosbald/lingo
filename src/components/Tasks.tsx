import { useState } from 'react'
import { tasks as initialTasks, type Task } from '../data'

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [sourceFilter, setSourceFilter] = useState<'all' | 'auto' | 'manual'>('all')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const addTask = () => {
    if (!newTaskTitle.trim()) return
    const newTask: Task = {
      id: `t-${Date.now()}`,
      title: newTaskTitle.trim(),
      completed: false,
      priority: 'medium',
      source: 'manual',
      createdAt: 'Just now',
    }
    setTasks(prev => [newTask, ...prev])
    setNewTaskTitle('')
    setShowAddForm(false)
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active' && t.completed) return false
    if (filter === 'completed' && !t.completed) return false
    if (sourceFilter !== 'all' && t.source !== sourceFilter) return false
    return true
  })

  const activeCount = tasks.filter(t => !t.completed).length
  const completedCount = tasks.filter(t => t.completed).length
  const autoCount = tasks.filter(t => t.source === 'auto' && !t.completed).length

  const priorityColors = {
    high: 'text-red-400 bg-red-500/10 border-red-500/20',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    low: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header Stats */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-zinc-800/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-zinc-100">Tasks</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/30 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-center">
            <div className="text-lg font-bold text-zinc-100">{activeCount}</div>
            <div className="text-[10px] text-zinc-500">Active</div>
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-center">
            <div className="text-lg font-bold text-emerald-400">{completedCount}</div>
            <div className="text-[10px] text-zinc-500">Done</div>
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-center">
            <div className="text-lg font-bold text-amber-400">{autoCount}</div>
            <div className="text-[10px] text-zinc-500">AI Extracted</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <div className="flex gap-1 flex-1">
            {(['all', 'active', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                  filter === f
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-zinc-500 hover:text-zinc-300 bg-zinc-900/30'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {(['all', 'auto', 'manual'] as const).map(f => (
              <button
                key={f}
                onClick={() => setSourceFilter(f)}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                  sourceFilter === f
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-zinc-500 hover:text-zinc-300 bg-zinc-900/30'
                }`}
              >
                {f === 'auto' ? '⚡ AI' : f === 'manual' ? '✏️ Manual' : 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="px-4 py-3 border-b border-zinc-800/50 bg-zinc-900/30 animate-fade-in">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder="Add a task..."
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
              autoFocus
            />
            <button
              onClick={addTask}
              className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-xs font-medium hover:bg-indigo-600 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 pb-24">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-3xl mb-3">✨</div>
            <p className="text-sm text-zinc-400">No tasks here</p>
            <p className="text-xs text-zinc-600 mt-1">Tasks will appear as Omi extracts them from conversations</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                task.completed
                  ? 'bg-zinc-900/20 border-zinc-800/30'
                  : 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50'
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  task.completed
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-zinc-600 hover:border-indigo-400'
                }`}
              >
                {task.completed && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-relaxed ${task.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                  {task.source === 'auto' && (
                    <span className="text-[9px] text-amber-400/70 flex items-center gap-0.5">
                      ⚡ AI extracted
                    </span>
                  )}
                  {task.dueDate && (
                    <span className="text-[10px] text-zinc-500">Due {task.dueDate}</span>
                  )}
                  <span className="text-[10px] text-zinc-600">{task.createdAt}</span>
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 rounded text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
