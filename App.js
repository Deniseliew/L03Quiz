import React, { useState } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import elephant from './images/elephant.jpg';
import leopard from './images/leopard.jpg';
import bee from './images/bee.jpg'; // Corrected import for the 'bee' image

// Custom component for each quiz question
const QuizQuestion = ({ question, options, onAnswerChange }) => {
    return (
        <View style={styles.questionContainer}>
            <Image source={question} style={styles.image} />
            <Text style={styles.questionText}>What animal is this?</Text>
            <RNPickerSelect
                onValueChange={(value) => onAnswerChange(value)}
                items={options.map(option => ({ label: option, value: option }))}
            />
        </View>
    );
};

const App = () => {
    // Questions data
    const questions = [
        {
            image: elephant,
            options: ['Rhino', 'Elephant', 'Hippo'],
            correctAnswer: 'Elephant',
        },
        {
            image: leopard,
            options: ['Leopard', 'Tiger', 'Cheetah'],
            correctAnswer: 'Leopard',
        },
        {
            image: bee,
            options: ['Bee', 'Eagle', 'Parrot'],
            correctAnswer: 'Bee',
        },
    ];

    // State for user answers and score
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [score, setScore] = useState(0);

    // Function to update answer for each question
    const handleAnswerChange = (answer, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
    };

    // Submit button handler
    const handleSubmit = () => {
        let correctCount = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        Alert.alert('Quiz Result', `You have ${correctCount} correct answers!`, [{ text: 'OK' }]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Animal Quiz</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {questions.map((q, index) => (
                    <QuizQuestion
                        key={index}
                        question={q.image}
                        options={q.options}
                        onAnswerChange={(answer) => handleAnswerChange(answer, index)}
                    />
                ))}
                <Button title="SUBMIT ANSWERS" onPress={handleSubmit} color="#007bff" />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    questionContainer: {
        marginBottom: 30,
    },
    questionText: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
});

export default App;
