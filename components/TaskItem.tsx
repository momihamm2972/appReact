import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface Task {
  id: string;
  text: string;
}

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<Props> = ({ task, onDelete }) => {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{task.text}</Text>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

interface Props {
    task: Task;
    onDelete: (id: string) => void;
    onToggleDone?: (id: string) => void; // optional
  }  

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
  },
  taskText: {
    fontSize: 16,
  },
  delete: {
    color: 'red',
    fontSize: 18,
  },
});

export default TaskItem;
