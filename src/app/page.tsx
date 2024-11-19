'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "../components/ui/button"
import { ArrowUpRight, Download, Copy, RotateCcw, User, Bell, Settings, X, Edit2, Save } from 'lucide-react'
import Image from 'next/image'
import { config } from '../lib/config'

export default function URExpertApp() {
  const [showReport, setShowReport] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editableReport, setEditableReport] = useState('')
  const [reportTitle, setReportTitle] = useState('')

  const getCurrentDateTime = () => {
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const year = now.getFullYear()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${month}${day}${year}${hours}${minutes}${seconds}`
  }

  const generateReport = async (chartData: string) => {
    setLoading(true)
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.openRouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://urexpert.ai',
          'X-Title': 'URExpert'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-90b-vision-instruct',
          messages: [{
            role: 'user',
            content: `Generate a concise patient review based on the following data:
Follow these guidelines strictly:
  
  Generate a title for the review with patient age, gender, and the main admission diagnosis. ex. 79M NSTEMI.

  Provide a brief history of the present illness, including the chief complaint and any relevant patient history. ER Care (if applicable): Summarize the initial findings in the Emergency Room, including initial vitals, findings, and care provided. Include amount of PRN IV meds given in ER such as antiemetics, pain meds, benzo, antiarrhythmic, etc. (one paragraph)

  Assessment: Give the admission diagnoses (In one paragraph with each diagnoses separated by a comma)

  Daily Progress: Always include. Start with the date (MM/DD) and provide a concise, one-line update on the patient's progress for that day. Include amount of PRN IV meds given such as antiemetics, pain meds, benzo, antiarrhythmic, etc. (one line each, repeat for each day of progress notes given, in ascending order)

  Vital Signs (VS): Include temperature (Temp), respiratory rate (Resp), heart rate (HR), blood pressure (BP), and oxygen saturation (SPo2). Mention the level of FiO2 and the delivery system (e.g., NC, BiPAP, HHFNC) if applicable. (on one line. NEVER BULLET POINTS. )

  EKG: Include if available in one line

  Abnormal Labs: if available Include abnormal lab results only, and add baseline values if available. (on one line. NEVER BULLET POINTS. )

  Imaging: if available Report imaging results, each in one line.

  Surgery/Procedure Details: Only if available. Start with Date MM/DD and Procedure Name and CPT code if known or provided

  Plan: Provide a summarized plan for that day. (ONE PARAGRAPH NEVER BULLET POINTS. )

  Summary of hospital stay: Provide a comprehensive explanation of why the chosen status (IP, OSV, Outpatient, PA) is appropriate based on the patient's condition, symptoms, initial treatment and response, and progression and anticipation of treatment based on consultation, patient commorbidities and other aspect that may affect their prognosis. (short paragraph)

  Recommendation for status: Specify either Inpatient (IP), Observation (OSV), Outpatient, or Send to PA based on the clinical information provided.

  InterQual Subset: Indicate the most appropriate InterQual Subset relevant to the case.

  1. Format the report exactly as provided in the input data.
  2. ONLY INCLUDE SECTIONS WHERE INFORMATION IS PROVIDED.
  3. Be concise and straight to the point.
  4. DO NOT mention patient names, family names, or MD names for HIPAA purposes.
  5. Do not include sections or data if the information is not provided.
  6. Do not be creative or add information not provided in the patient data.
  7. Use the exact section titles as given in the input.
  8. Maintain the order of sections as they appear in the input data.
  9. Do not add any additional sections or commentary.
  10. Summary of status: Provide a brief explanation of why the chosen status (IP, OSV, Outpatient, PA) is appropriate based on the patient's condition and progression. (short paragraph)
  11. Plan is always one paragraph - NEVER BULLET POINTS. 
  12. For vital sign: Include temperature (Temp), respiratory rate (Resp), heart rate (HR), blood pressure (BP), and oxygen saturation (SPo2). Mention the level of FiO2 and the delivery system (e.g., NC, BiPAP, HHFNC) if applicable. (on one line)
  13. Do not write thing like "Based on the information provided" or "Based on the patient's condition and progression" or "Here is a concise patient review based on the provided data:" start directly with the report.
  
  Ensure the output follows this exact format:

  [Title]-${getCurrentDateTime()}

  Brief HPI: [content]
  
  Assessment: [content]

  [Date]: [content]
  [Additional dates if provided]

  Vital signs: [content]

  EKG: [content]

  Abnormal labs: [content]

  Imaging: [content]

  Surgery/procedure details: [content]

  Plan: [content]

  Summary of status: [content]

  Recommendation for status: [MUST BE ONLY ONE OF: Inpatient, Observation, Outpatient, or Send to PA for secondary review]

  InterQual subset: [Specify the exact InterQual subset name, do not use generic terms like "Inpatient"]

..........................................................
  Chart data to review:
${chartData}`
          }]
        })
      })
      const data = await response.json()
      const generatedReport = data.choices[0].message.content
      const firstLine = generatedReport.split('\n')[0].trim()
      const title = firstLine.includes('-') ? firstLine : `${firstLine}-${getCurrentDateTime()}`
      const reportWithTimestamp = [title, ...generatedReport.split('\n').slice(1)].join('\n')
      setReport(reportWithTimestamp)
      setEditableReport(reportWithTimestamp)
      setReportTitle(title)
    } catch (error) {
      console.error('Error generating report:', error)
      setReport('Error generating report. Please try again.')
      setEditableReport('Error generating report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setShowReport(true)
      generateReport(inputValue)
    }
  }, [inputValue, generateReport])

  const toggleReport = () => {
    setShowReport(prev => !prev)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([report], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = `${reportTitle || 'report'}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(report)
  }

  const handleRefresh = () => {
    if (inputValue.trim()) {
      generateReport(inputValue)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditableReport(report)
  }

  const handleSave = () => {
    setIsEditing(false)
    setReport(editableReport)
    const firstLine = editableReport.split('\n')[0].trim()
    setReportTitle(firstLine)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        handleSubmit(e as unknown as React.FormEvent)
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [inputValue, handleSubmit])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#101F28] to-[#1D324B] font-montserrat text-[#E9E9E9] overflow-hidden">
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-end mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm">User</span>
            <User className="w-6 h-6 text-[#96C21A]" />
            <Bell className="w-6 h-6 text-[#96C21A]" />
            <Settings className="w-6 h-6 text-[#96C21A]" />
          </div>
        </header>

        <main className="flex min-h-[80vh] items-center justify-center relative">
          <div className={`flex flex-col items-center transition-all duration-700 ease-in-out transform ${showReport ? 'translate-x-[0%]' : 'translate-x-20'}`} style={{ width: showReport ? '50%' : '100%' }}>
            <div className={`transition-all duration-700 ease-in-out transform ${showReport ? 'scale-90' : 'scale-100'}`}>
              <Image
                src="/urexpertlogo.png"
                alt="UREXPERT Logo"
                width={450}
                height={450}
                className="mb-2 drop-shadow-2xl"
                priority
              />
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="relative">
                <textarea
                  placeholder="Add your patient's chart"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-transparent border-2 border-[#96C21A] rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#96C21A] transition-all duration-300"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent"
                >
                  <ArrowUpRight className="w-6 h-6 text-[#96C21A]" />
                </Button>
              </div>
            </form>
          </div>

          <div 
            className={`flex-grow transition-all  duration-500 ease-out transform ${showReport ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
            <div className="bg-[#0D1D2D] rounded-lg p-6 border border-[#96C21A] shadow-xl relative max-w-[800px]">
              
              <div className="flex justify-end space-x-2 mb-4">
                <Button variant="ghost" size="icon" className="hover:bg-[#96C21A]/10" onClick={handleDownload}>
                  <Download className="w-5 h-5 text-[#96C21A]" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-[#96C21A]/10" onClick={handleCopy}>
                  <Copy className="w-5 h-5 text-[#96C21A]" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-[#96C21A]/10" onClick={handleRefresh}>
                  <RotateCcw className="w-5 h-5 text-[#96C21A]" />
                </Button>
                {isEditing ? (
                  <Button variant="ghost" size="icon" className="hover:bg-[#96C21A]/10" onClick={handleSave}>
                    <Save className="w-5 h-5 text-[#96C21A]" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" className="hover:bg-[#96C21A]/10" onClick={handleEdit}>
                    <Edit2 className="w-5 h-5 text-[#96C21A]" />
                  </Button>
                )}
                <Button
                onClick={toggleReport}
                className=" bg-transparent hover:bg-[#96C21A]/10"
              >
                <X className="w-5 h-5 text-[#96C21A]" />
              </Button>
              </div>
              <div className="h-[700px] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#96C21A]"></div>
                  </div>
                ) : (
                  <div className="text-[0.89rem] text-left text-[#E9E9E9]/60 whitespace-pre-wrap px-4 h-full">
                    {isEditing ? (
                      <textarea
                        value={editableReport}
                        onChange={(e) => setEditableReport(e.target.value)}
                        className="w-full h-[650px] bg-transparent border-none focus:outline-none resize-none text-[0.89rem] text-[#E9E9E9]/60"
                        style={{ height: 'calc(100vh - 250px)', minHeight: '650px' }}
                      />
                    ) : (
                      report || 'Your report will generate here'
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap');

        body {
          font-family: 'Montserrat', sans-serif;
        }

        .bg-gradient-to-b {
          animation: gradientAnimation 10s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes gradientAnimation {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        textarea::-webkit-scrollbar {
          display: none;
        }

        textarea {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
