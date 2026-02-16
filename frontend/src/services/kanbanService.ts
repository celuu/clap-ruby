import { API_ENDPOINTS, fetchWithCredentials } from "../config/api";
import { Column, Task } from "@/types"
import { useCallback, useState } from "react"

export const useGetColumns = () => {
  const [column, setColumn] = useState<Column | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const execute = useCallback(async (): Promise<Column[]> => {
    setLoading(true);
    setError(null)
    try {
      const data = await fetchWithCredentials(API_ENDPOINTS.columns, {
        method: 'GET'
      })
      setColumn(data);
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to get column';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }

  }, [])
  return { column, error, loading, execute }
}

export const useCreateColumn = () => {
  const [column, setColumn] = useState<Column | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const execute = useCallback(async( column: {
    name: string;
    position: number;
  }): Promise<Column> => {
    setLoading(true);
    setError(null)
    try {
      const data = await fetchWithCredentials(API_ENDPOINTS.columns, {
        method: 'POST',
        body: JSON.stringify({column})
      })
      setColumn(data);
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create column';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }

  }, [])
  return {column, error, loading, execute}
}

export const useUpdateColumn = () => {
  const [column, setColumn] = useState<Column | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const execute = useCallback(async (column: {
    name: string;
    position: number;
  }): Promise<Column> => {
    setLoading(true);
    setError(null)
    try {
      const data = await fetchWithCredentials(API_ENDPOINTS.columns, {
        method: 'PATCH',
        body: JSON.stringify({ column })
      })
      setColumn(data);
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update column';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }

  }, [])
  return { column, error, loading, execute }
}

export const useDeleteColumn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const execute = useCallback(async (columnId: string): Promise<void> => {
    setLoading(true);
    setError(null)
    try {
      await fetchWithCredentials(`${API_ENDPOINTS.columns}/${columnId}`, {
        method: 'DELETE',
      })
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete column';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }

  }, [])
  return { error, loading, execute }
}

export const useCreateTask = () => {
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const execute = useCallback(async (task: {
    name: string;
    position: number;
    column_id: number;
  }): Promise<Task> => {
    setLoading(true);
    setError(null)
    try {
      const data = await fetchWithCredentials(API_ENDPOINTS.tasks, {
        method: 'POST',
        body: JSON.stringify({ task })
      })
      setTask(data);
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create task';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }

  }, [])
  return { task, error, loading, execute }
}

export const useUpdateTask = () => {
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const execute = useCallback(async (task: {
    name: string;
    position: number;
    column_id: number;
  }): Promise<Task> => {
    setLoading(true);
    setError(null)
    try {
      const data = await fetchWithCredentials(API_ENDPOINTS.tasks, {
        method: 'PATCH',
        body: JSON.stringify({ task })
      })
      setTask(data);
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update task';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }

  }, [])
  return { task, error, loading, execute }
}

export const useDeleteTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)
  const execute = useCallback(async (task_id: string): Promise<void> => {
    setLoading(true);
    setError(null)
    try {
      await fetchWithCredentials(`${API_ENDPOINTS.tasks}/${task_id}`, {
        method: 'DELETE',
      })
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update column';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }

  }, [])
  return { error, loading, execute }
}
