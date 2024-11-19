import React from 'react'
import { questions } from './Questions'

const App = () => {

  const [isShowSummary, setIsShowSummary] =React.useState(false);
  const[currentQuestion, setCurrentQuestion] = React.useState(0);
  const [isActive, setIsActive] = React.useState(null);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [counterCorrect, setCounterCorrect ] = React.useState(0);
  const [randomize, setRandomize] = React.useState([]);

  const handleNextQuestion = () =>{
    setIsActive(null);
    setCurrentQuestion((prev) => prev + 1 );
   if(currentQuestion === questions.length -1 ){
    setIsShowSummary(true);
   }
   if(selectedAnswer.isCorrect === true){
   setCounterCorrect((prev) => prev + 1)

   }
  //  console.log(selectedAnswer.isCorrect);
  };
 
  

  const handleSetActiveChoice = (key, item) => {
    setIsActive(key);
    setSelectedAnswer(item);
   }
   const handleRetake = () => {
    setIsShowSummary(false);
    setCurrentQuestion(0);
    setCounterCorrect(0);
    setRandomize (questions
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value))
   }
   React.useEffect(() =>{
    setRandomize (questions
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value))
    
   },[])




  return (
    <>
    <header className='p-4 flex gap-4 bg-gray-500'>

    {Array.from(Array(questions.length).keys()).map((i) => (
          <span className={`${i <= currentQuestion ? "bg-blue-800" : "" } h-2 bg-blue-500 w-full rounded-md`} key={i}></span>
        ))}

    </header>

    <main className='h-[calc(100vh-40px)] w-full bg-gray-500 flex justify-center items-center'>
    



     <div className=' max-w-[400px] w-full bg-gray-50 p-4'>
    {isShowSummary
     ? (<div className="summary">
      {counterCorrect / questions.length *100 >= 60 ? (<div className="passed text-center">
          <h2 className='text-2xl font-bold'>Congratulations!!</h2>
          <h3 className='text-4xl  mb-2'> 
            <span className='text-lg'>U Passed the Quiz</span> <br /> {Math.round((counterCorrect / questions.length) * 100)}%</h3>
          <p className='mb-5'>{counterCorrect } / {questions.length} Correct Answers</p>
          <button className='bg-blue-700 text-white w-full rounded-full py-2'>
            Print Certificate
          </button>
        </div>) : (<div className="failed text-center">
        <h2 className='text-2xl font-bold'>Failed!!</h2>
          <h3 className='text-4xl  mb-2'> 
            <span className='text-lg'>You'r scored is</span> <br /> {Math.round((counterCorrect / questions.length) * 100)}%</h3>
          <p className='mb-5'>{counterCorrect } / {questions.length} Correct Answers</p>
          <button className='bg-red-700 text-white w-full rounded-full py-2 ' onClick={handleRetake}>
            Retake Quiz
          </button>
        </div>)}
        
        
       </div>) : ( <div className='Quiz'>
      <small className=' text-center block'>{currentQuestion + 1}/{questions.length} Question</small>  
      <h4 className='font-bold text-lg text-center mb-5'>{randomize.length > 0 && randomize[currentQuestion].question_question}</h4>
     
     {randomize.length > 0 && randomize[currentQuestion].Choices.map((item, key)=>(
     <button className={`w-full mb-2 py-2 bg-gray-500 text-white rounded-full ${key === isActive ? "!bg-blue-800" : ""}`} key={key}
     onClick={() => handleSetActiveChoice(key, item)}>
     {item.choice}
     </button>
))}
    <button className={` block w-full bg-blue-700 text-white py-2 rounded-full mt-5 ${isActive === null ? "pointer-events-none" : ""}`}  onClick={handleNextQuestion }>
     Next Question
    </button>
    </div>
  )}

   

    
     </div>


    </main>
    </>
  )
}

export default App
