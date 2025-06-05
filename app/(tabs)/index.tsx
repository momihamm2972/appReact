import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../../components/TaskItem';
import { LinearGradient } from 'expo-linear-gradient'; 
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

type Task =  {
  id: string;
  text: string;
  done?: boolean;
}

function HomeScreen() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const firstTime = useRef(true);
  useEffect(() => {
    if (firstTime.current === false) {
      saveTasks();
    } else {
      firstTime.current = false;
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    } catch (e) {
      console.error(e);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  };

  const addTask = () => {
    if (task.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: task,
        done: false,
      };
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleDone = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem task={item} onDelete={deleteTask} onToggleDone={() => toggleDone(item.id)} />
  );

  return (
    <LinearGradient
      colors={['#A8FFEB', '#0099FF']} 
      style={styles.container}
    >
      <Text style={[styles.title, { fontFamily: 'Pacifico_400Regular' }]}>Tasks To Do</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Enter a task"
          style={styles.input}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <FlatList
        data={tasks || []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}






// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store';
// import { addTask, deleteTask, toggleDone } from '../tasksSlice';

// const dispatch = useDispatch();
// const tasks = useSelector((state: RootState) => state.tasks.list);
