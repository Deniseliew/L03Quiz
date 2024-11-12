import React, { useState } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import elephant from './images/elephant.jpg';
import leopard from './images/leopard.jpg';
import bee from './images/bee.jpg';

const QuizQuestion = ({ question, options, onAnswerChange }) => {
    return (
        <View style={styles.questionContainer}>
            <Image source={question} style={styles.image} />
            <Text style={styles.questionBox}>What animal is this?</Text>
            <RNPickerSelect
                onValueChange={(value) => onAnswerChange(value)}
                items={options.map(option => ({ label: option, value: option }))}
            />
        </View>
    );
};

const App = () => {
    const questions = [
        { image: elephant, options: ['Rhino', 'Elephant', 'Hippo'], correctAnswer: 'Elephant' },
        { image: leopard, options: ['Leopard', 'Tiger', 'Cheetah'], correctAnswer: 'Leopard' },
        { image: bee, options: ['Bee', 'Eagle', 'Parrot'], correctAnswer: 'Bee' },
    ];

    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    const handleAnswerChange = (answer, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const correctCount = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
        Alert.alert('Quiz Result', `You have ${correctCount} correct answers!`);
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
                <Button title="Submit Answers" onPress={handleSubmit} color="#007bff" />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    scrollContainer: { paddingBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    questionContainer: { marginBottom: 20 },
    image: { width: '100%', height: 200, borderRadius: 10 },
    questionBox: {
        backgroundColor: '#d3d3d3', // Light grey background
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
});

export default App;
