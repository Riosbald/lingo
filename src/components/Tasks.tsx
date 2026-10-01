import { useState } from 'react'
import { tasks as initialTasks, type Task } from '../data'

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
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
    return true
  })

  const activeCount = tasks.filter(t => !t.completed).length
  const completedCount = tasks.filter(t => t.completed).length

  const priorityColors = {
    high: { color: '#f87171', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)' },
    medium: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.2)' },
    low: { color: '#a1a1aa', bg: 'rgba(113, 113, 122, 0.1)', border: 'rgba(113, 113, 122, 0.2)' },
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flexShrink: 0, padding: '16px', borderBottom: '1px solid rgba(39, 39, 42, 0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fafafa', margin: 0 }}>Tasks</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#818cf8',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            +
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
          <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(24, 24, 27, 0.5)', border: '1px solid rgba(39, 39, 42, 0.5)', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fafafa' }}>{activeCount}</div>
            <div style={{ fontSize: '10px', color: '#71717a' }}>Active</div>
          </div>
          <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(24, 24, 27, 0.5)', border: '1px solid rgba(39, 39, 42, 0.5)', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#34d399' }}>{completedCount}</div>
            <div style={{ fontSize: '10px', color: '#71717a' }}>Done</div>
          </div>
          <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(24, 24, 27, 0.5)', border: '1px solid rgba(39, 39, 42, 0.5)', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fbbf24' }}>{tasks.filter(t => t.source === 'auto' && !t.completed).length}</div>
            <div style={{ fontSize: '10px', color: '#71717a' }}>AI</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          {(['all', 'active', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                flex: 1,
                padding: '6px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: 500,
                background: filter === f ? 'rgba(99, 102, 241, 0.2)' : 'rgba(24, 24, 27, 0.3)',
                color: filter === f ? '#a5b4fc' : '#71717a',
                border: filter === f ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {showAddForm && (
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(39, 39, 42, 0.5)', background: 'rgba(24, 24, 27, 0.3)' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder="Add a task..."
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                background: '#27272a',
                border: '1px solid #3f3f46',
                color: '#e4e4e7',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={addTask}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#6366f1',
                color: 'white',
                fontSize: '12px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 96px' }}>
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>✨</div>
            <p style={{ fontSize: '14px', color: '#a1a1aa', margin: 0 }}>No tasks here</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px',
                borderRadius: '12px',
                background: task.completed ? 'rgba(24, 24, 27, 0.2)' : 'rgba(24, 24, 27, 0.5)',
                border: `1px solid ${task.completed ? 'rgba(39, 39, 42, 0.3)' : 'rgba(39, 39, 42, 0.5)'}`,
                marginBottom: '8px'
              }}
            >
              <button
                onClick={() => toggleTask(task.id)}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${task.completed ? '#10b981' : '#52525b'}`,
                  background: task.completed ? '#10b981' : 'transparent',
                  cursor: 'pointer',
                  flexShrink: 0,
                  marginTop: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px'
                }}
              >
                {task.completed && '✓'}
              </button>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.5,
                  color: task.completed ? '#71717a' : '#e4e4e7',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  margin: 0
                }}>
                  {task.title}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <span style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '9px',
                    fontWeight: 500,
                    color: priorityColors[task.priority].color,
                    background: priorityColors[task.priority].bg,
                    border: `1px solid ${priorityColors[task.priority].border}`
                  }}>
                    {task.priority}
                  </span>
                  {task.source === 'auto' && (
                    <span style={{ fontSize: '9px', color: 'rgba(251, 191, 36, 0.7)' }}>⚡ AI</span>
                  )}
                  {task.dueDate && (
                    <span style={{ fontSize: '10px', color: '#71717a' }}>Due {task.dueDate}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  padding: '4px',
                  borderRadius: '4px',
                  color: '#52525b',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
