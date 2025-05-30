import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface Task {
  id: string;
  text: string;
  done?: boolean;
}

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
  // onToggleDone: (id: string) => void;
}

export default function TaskItem({ task, onDelete, onToggleDone }: Props) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onToggleDone(task.id)}>
        <View style={[styles.statusCircle, task.done && styles.statusDone]} />
      </TouchableOpacity>

      <Text
        style={[
          styles.text,
          task.done && styles.textDone,
        ]}
        onPress={() => onToggleDone(task.id)}
      >
        {task.text}
      </Text>

      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#888',
    marginRight: 12,
  },
  statusDone: {
    backgroundColor: '#0f0',
    borderColor: '#0f0',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  delete: {
    fontSize: 18,
    color: 'red',
    marginLeft: 10,
  },
});
