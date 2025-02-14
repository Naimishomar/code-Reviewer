import {useState, useEffect} from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import prism from 'prismjs'
import Editor from 'react-simple-code-editor';
import axios from 'axios'

function CodeInput() {
    const [open, setOpen] = useState('0%');
    const [code, setCode] = useState(`function sum(){ 
    return 1+1; 
}`)
    const [review, setReview] = useState('')
    useEffect(() => {
      prism.highlightAll();
    })

    const reviewCode = async () => {
        try {
            const response = await axios.post('http://localhost:3000/ai/get-review', { code })
            setReview(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>  
        <div className="opencode" onClick={()=> setOpen('0%')}>
            <i className="ri-arrow-right-line"></i>
        </div>   
        <div className='codeInput' style={{translate: open}}>
            <div className="closeCode" onClick={()=> setOpen('-110%')}>
                <i className="ri-arrow-left-line"></i>
            </div>
            <div className="code">
                <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={code => prism.highlight(code, prism.languages.javascript,'javascript')}
                padding={10}
                style={{
                    fontFamily: '"Fira Code", "Fira Mono", monospace',
                    fontSize: 16,
                    borderRadius: 5,
                    width: '100%',
                    height: '100%',
                }}
                />
            </div>
            <div className="review-btn" onClick={reviewCode}>
                <p>Review Code <i className="ri-arrow-right-line"></i></p>
            </div>
        </div>
        </>
  )
}

export default CodeInput