import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import navigation for the back button
import {useDispatch} from 'react-redux';
import {addItem, updateItem} from '../Redux/Actions/itemActions'; // Import the actions to add or update items
import {colors, Icons} from '../utils';

const AddEditScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // State for input fields
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  // Check if we are editing or adding a new item
  const {currentItem} = route.params || {}; // Get data passed from the previous screen

  useEffect(() => {
    if (currentItem) {
      setInput1(currentItem.name);
      setInput2(currentItem.description);
    } else {
      setInput1('');
      setInput2('');
    }
  }, [currentItem]);

  // Handle saving the item (either adding or updating)
  const handleSubmit = () => {
    if (input1 && input2) {
      if (currentItem) {
        // Update the existing item
        dispatch(
          updateItem({id: currentItem.id, name: input1, description: input2}),
        );
      } else {
        // Add a new item
        dispatch(addItem({name: input1, description: input2}));
      }
      Keyboard.dismiss()
      navigation.goBack(); // Go back to the previous screen after saving
    } else {
      Alert.alert('Validation', 'Please fill in all fields!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
       
        onPress={() => navigation.goBack()}>
        <Image
          source={Icons.back}
          style={styles.backButton}
          tintColor={colors.baseBlack}
        />
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.heading}>
        {currentItem ? 'Edit Data' : 'Add New Data'}
      </Text>

      {/* First Input (name) */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={input1}
        onChangeText={setInput1}
      />

      {/* Second Input (description) */}
      <TextInput
        style={styles.input}
        placeholder="Enter your description"
        value={input2}
        onChangeText={setInput2}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{currentItem ? 'Update' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.backColor,
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    marginHorizontal:'5%',
    backgroundColor: colors.baseBlack,
    borderRadius: 5,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
  
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:'20%',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginHorizontal:'5%',
    marginBottom: 15,
  },
  submitButton: {
    width: '50%',
    padding: 10,
    backgroundColor: colors.baseBlack,
    borderRadius: 5,
    alignSelf:'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    height: 30,
    width: 30,
  },
});

export default AddEditScreen;
