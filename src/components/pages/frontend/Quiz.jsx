

import React from 'react'
import { questions } from '../backend/questions';
import useQueryData from '@/components/custom-hook/useQueryData';
import { StoreContext } from '@/components/Store/storeContext';


const Quiz = () => {
  const{store, dispatch} = React.useContext(StoreContext);

  const [isShowSummary, setIsShowSummary] =React.useState(false);
  const[currentQuestion, setCurrentQuestion] = React.useState(0);
  const [isActive, setIsActive] = React.useState(null);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [counterCorrect, setCounterCorrect ] = React.useState(0);
  const [randomize, setRandomize] = React.useState([]);


  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/v2/question`, // endpoint
    "get", // method
    "question"
  );

  const handleNextQuestion = () =>{
    setIsActive(null);
    setCurrentQuestion((prev) => prev + 1 );
   if(currentQuestion === result?.data.length -1 ){
    setIsShowSummary(true);
   }
   if(selectedAnswer.isCorrect === "true"){
   setCounterCorrect((prev) => prev + 1)

   }

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

    !isLoading &&
    setRandomize (
      result?.data
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value))
    
   },[])




  return (
    <>
    <header className='p-4 flex gap-4 bg-gray-500'>

    {Array.from(Array(result?.data.length).keys()).map((i) => (
          <span className={`${i <= currentQuestion ? "bg-blue-800" : "" } h-2 bg-blue-500 w-full rounded-md`} key={i}></span>
        ))}

    </header>

    <main className='h-[calc(100vh-40px)] w-full bg-gray-500 flex justify-center items-center'>
    



     <div className=' max-w-[400px] w-full bg-gray-50 p-4'>
    {isShowSummary
     ? (<div className="summary">
      {counterCorrect / result?.data.length *100 >= 60 ? (<div className="passed text-center">
          <h2 className='text-2xl font-bold text-success'>Congratulations!!</h2>
          <h1 className='text-black font-semibold'>{store.name}</h1>
          <h3 className='text-4xl  mb-2'> 
            <span className='text-lg text-success '>You Passed the Quiz</span> <br /> {Math.round((counterCorrect / result?.data.length) * 100)}%</h3>
          <p className='mb-5'>{counterCorrect } / {result?.data.length} Correct Answers</p>
          <button className='bg-blue-700 text-white w-full rounded-full py-2'>
            Print Certificate
          </button>
        </div>) : (<div className="failed text-center">
        <h2 className='text-2xl font-bold'>Failed!!</h2>
          <h3 className='text-4xl  mb-2'> 
            <span className='text-lg'>Your scored is</span> <br /> {Math.round((counterCorrect / result?.data.length) * 100)}%</h3>
          <p className='mb-5'>{counterCorrect } / {result?.data.length} Correct Answers</p>
          <button className='bg-red-700 text-white w-full rounded-full py-2 ' onClick={handleRetake}>
            Retake Quiz
          </button>
        </div>)}
        
        
       </div>) : ( <div className='Quiz'>
      <small className=' text-center block'>{currentQuestion + 1}/{result?.data.length} Question</small>  
      <h4 className='font-bold text-lg text-center mb-5'>{result?.data.length > 0 && result?.data[currentQuestion].question_title}</h4>
     
     {result?.data.length >
      0 && JSON.parse
      (result?.data[currentQuestion].question_choices).map((item, key)=>(
     <button className={`w-full mb-2 py-2 bg-gray-500 text-white rounded-full ${key === isActive ? "!bg-blue-800" : ""}`} key={key}
     onClick={() => handleSetActiveChoice(key, item)}>
     {item.choice}
     </button>
))}
    <button className={` block w-full bg-blue-700 text-white py-2 rounded-full mt-5 ${isActive === null ?
       "pointer-events-none" : ""}`}  onClick={handleNextQuestion }>
     Next Question
    </button>
    </div>
  )}

   

    
     </div>


    </main>
    </>
  )
}

export default Quiz
