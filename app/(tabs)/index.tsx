import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../../components/TaskItem';
import { useFonts } from 'expo-font';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { LinearGradient } from 'expo-linear-gradient';

interface Task {
  id: string;
  text: string;
  done?: boolean;
}

export default function HomeScreen() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
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
      const newTask: Task = { id: Date.now().toString(), text: task, done: false };
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
    <TaskItem task={item} onDelete={deleteTask} onToggleDone={toggleDone} />
  );

  if (!fontsLoaded) return null;

  return (
    <LinearGradient
      // colors={['#a8edea', '#fed6e3']} // Mint to pink-blue gradient
      colors={['#A8FFEB', '#0099FF']} // mint to blue
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
        data={tasks}
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
