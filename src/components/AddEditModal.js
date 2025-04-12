import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils';

const AddEditModal = ({ visible, onClose, onSave, initialData }) => {
  // State for input fields
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  // Set the initial values if we're editing
  useEffect(() => {
    if (initialData) {
      setInput1(initialData.name);
      setInput2(initialData.description);
    } else {
      setInput1('');
      setInput2('');
    }
  }, [initialData, visible]);

  const handleSubmit = () => {
    if (input1 && input2) {
      // Pass data to parent (HomeScreen) to add or update the item
      onSave({ name: input1, description: input2 });
      onClose();
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}  // Close modal when user presses back or outside the modal
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{initialData ? 'Edit Data' : 'Add New Data'}</Text>

          {/* First Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={input1}
            onChangeText={setInput1}
          />

          {/* Second Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your description"
            value={input2}
            onChangeText={setInput2}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,  // Rounded corners
    paddingLeft: 10,
    marginBottom: 15,
  },
  submitButton: {
    width: '50%',
    padding: 10,
    backgroundColor: colors.baseBlack,
    borderRadius: 5,  // Small radius for the button
    alignItems: 'center',
    marginBottom: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 16,
    color: colors.baseBlack,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default AddEditModal;
