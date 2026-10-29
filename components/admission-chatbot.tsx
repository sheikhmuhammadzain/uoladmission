"use client";

import { useState, useRef, useEffect } from 'react';
import { generateResponse } from '@/lib/gemini';
import { RAGSystem } from '@/lib/rag';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { GraduationCap, Send, Upload, FileText, User, ArrowLeft, Home, Download, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Types for our application
type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

type StudentInfo = {
  name: string;
  email: string;
  phone: string;
  education: string;
  interests: string[];
  documents: Document[];
};

type Document = {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'processed';
  content?: string;
};

type Degree = {
  id: string;
  name: string;
  description: string;
  requirements: string;
  duration: string;
  match: number;
};

const AdmissionChatbot = () => {
  const { data: session, status } = useSession();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm the University of Lahore's admission assistant. I'm here to help you with your application process. What's your name?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(10);
  const [activeTab, setActiveTab] = useState('chat');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    email: '',
    phone: '',
    education: '',
    interests: [],
    documents: [],
  });
  const [recommendedDegrees, setRecommendedDegrees] = useState<Degree[]>([]);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [admissionLetter, setAdmissionLetter] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to send message to the chatbot
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Check if user is authenticated
    if (status !== "authenticated") {
      setShowAuthDialog(true);
      return;
    }

    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      // Use the new API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      let responseData;
      
      if (!response.ok) {
        // Handle server errors gracefully
        responseData = { 
          response: "I'm sorry, I'm having trouble connecting to the server. Please try again later." 
        };
      } else {
        responseData = await response.json();
      }
      
      // Add assistant message to the chat
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: responseData.response,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      // Update student info based on the conversation
      if (currentStep === 1 && userMessage.content.length > 0) {
        setStudentInfo(prev => ({ ...prev, name: userMessage.content }));
        setCurrentStep(2);
        setProgress(20);
      } else if (currentStep === 2 && userMessage.content.includes('@')) {
        setStudentInfo(prev => ({ ...prev, email: userMessage.content }));
        setCurrentStep(3);
        setProgress(30);
      } else if (currentStep === 3) {
        setStudentInfo(prev => ({ ...prev, phone: userMessage.content }));
        setCurrentStep(4);
        setProgress(40);
      } else if (currentStep === 4) {
        setStudentInfo(prev => ({ ...prev, education: userMessage.content }));
        setCurrentStep(5);
        setProgress(50);
      } else if (currentStep === 5) {
        const interests = userMessage.content.split(',').map(i => i.trim());
        setStudentInfo(prev => ({ ...prev, interests: interests }));
        setCurrentStep(6);
        setProgress(60);
        
        // Generate degree recommendations based on interests
        generateRecommendations();
        
        setActiveTab('documents');
      } else if (currentStep === 6) {
        setStudentInfo(prev => ({ ...prev, documents: Array.from(e.target.files).map(file => ({
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          name: file.name,
          type: file.type,
          status: 'pending'
        })) }));
        
        // Simulate document processing
        setTimeout(() => {
          setStudentInfo(prev => ({
            ...prev,
            documents: prev.documents.map(doc => ({
              ...doc,
              status: 'processed'
            }))
          }));
          
          toast({
            title: "Documents processed",
            description: "All documents have been successfully scanned and processed.",
          });
        }, 3000);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Sorry, I encountered an error. Please try again later or contact the university directly for assistance.',
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      sendMessage(input);
    }
  };

  // Mock document upload and processing
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newDocs: Document[] = Array.from(e.target.files).map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        type: file.type,
        status: 'pending'
      }));
      
      setStudentInfo(prev => ({
        ...prev,
        documents: [...prev.documents, ...newDocs]
      }));
      
      // Simulate document processing
      setTimeout(() => {
        setStudentInfo(prev => ({
          ...prev,
          documents: prev.documents.map(doc => ({
            ...doc,
            status: 'processed'
          }))
        }));
        
        toast({
          title: "Documents processed",
          description: "All documents have been successfully scanned and processed.",
        });
      }, 3000);
    }
  };

  // Process all documents and move to next step
  const handleProcessDocuments = () => {
    if (studentInfo.documents.length === 0) {
      toast({
        title: "No documents",
        description: "Please upload at least one document.",
        variant: "destructive"
      });
      return;
    }
    
    if (studentInfo.documents.some(doc => doc.status === 'pending')) {
      toast({
        title: "Processing documents",
        description: "Please wait while we finish processing your documents.",
      });
      return;
    }
    
    // Add a message about successful document processing
    const newAiMessage: Message = {
      id: Date.now().toString(),
      content: "Thank you for uploading your documents. I've successfully processed them and extracted the relevant information.",
      role: 'assistant',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newAiMessage]);
    setActiveTab('chat');
    
    // Move to next step
    sendMessage("Documents processed successfully");
  };

  // Generate degree recommendations based on student profile
  const generateRecommendations = () => {
    // Mock recommendations based on interests
    const allDegrees: Degree[] = [
      {
        id: '1',
        name: 'Bachelor of Computer Science',
        description: 'A comprehensive program covering programming, algorithms, data structures, and software engineering.',
        requirements: 'High school diploma with strong math background',
        duration: '4 years',
        match: 0
      },
      {
        id: '2',
        name: 'Bachelor of Business Administration',
        description: 'Develop skills in management, marketing, finance, and entrepreneurship.',
        requirements: 'High school diploma',
        duration: '4 years',
        match: 0
      },
      {
        id: '3',
        name: 'Bachelor of Medicine and Surgery (MBBS)',
        description: 'Become a medical doctor through this comprehensive medical program.',
        requirements: 'High school diploma with strong science background',
        duration: '5 years',
        match: 0
      },
      {
        id: '4',
        name: 'Bachelor of Electrical Engineering',
        description: 'Study power systems, electronics, control systems, and telecommunications.',
        requirements: 'High school diploma with strong math and physics',
        duration: '4 years',
        match: 0
      },
      {
        id: '5',
        name: 'Bachelor of Psychology',
        description: 'Understand human behavior, cognition, and mental processes.',
        requirements: 'High school diploma',
        duration: '4 years',
        match: 0
      }
    ];
    
    // Calculate match percentages based on interests
    const interestsLower = studentInfo.interests.map(i => i.toLowerCase());
    
    const matchedDegrees = allDegrees.map(degree => {
      let match = 0;
      
      // Simple matching algorithm
      if (interestsLower.some(i => i.includes('comput') || i.includes('software') || i.includes('programming') || i.includes('it'))) {
        if (degree.id === '1') match += 80;
        if (degree.id === '4') match += 40;
      }
      
      if (interestsLower.some(i => i.includes('business') || i.includes('management') || i.includes('finance') || i.includes('marketing'))) {
        if (degree.id === '2') match += 90;
      }
      
      if (interestsLower.some(i => i.includes('medic') || i.includes('doctor') || i.includes('health') || i.includes('biology'))) {
        if (degree.id === '3') match += 85;
        if (degree.id === '5') match += 30;
      }
      
      if (interestsLower.some(i => i.includes('engineer') || i.includes('electric') || i.includes('electronic'))) {
        if (degree.id === '4') match += 85;
        if (degree.id === '1') match += 40;
      }
      
      if (interestsLower.some(i => i.includes('psycho') || i.includes('behavior') || i.includes('mental') || i.includes('counsel'))) {
        if (degree.id === '5') match += 90;
      }
      
      // Ensure minimum match percentage
      match = Math.max(match, 30);
      
      return {
        ...degree,
        match
      };
    });
    
    // Sort by match percentage
    matchedDegrees.sort((a, b) => b.match - a.match);
    
    setRecommendedDegrees(matchedDegrees);
  };

  // Select a degree program
  const handleSelectDegree = (degree: Degree) => {
    setSelectedDegree(degree);
    
    // Add a message about the selection
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: `I'd like to apply for the ${degree.name} program.`,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setActiveTab('chat');
    
    // Process the selection
    setTimeout(() => {
      sendMessage(`Selected ${degree.name}`);
    }, 500);
  };

  // Generate admission letter
  const generateAdmissionLetter = () => {
    if (!selectedDegree || !studentInfo.name) return;
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const letter = `
      UNIVERSITY OF LAHORE
      1-KM Defence Road, Lahore, Pakistan
      
      ${currentDate}
      
      PROVISIONAL ADMISSION LETTER
      
      Dear ${studentInfo.name},
      
      Congratulations! We are pleased to inform you that you have been provisionally admitted to the ${selectedDegree.name} program at the University of Lahore for the upcoming academic session.
      
      Program Details:
      - Program: ${selectedDegree.name}
      - Duration: ${selectedDegree.duration}
      - Starting Date: August 15, 2025
      
      This admission is subject to verification of your original documents and meeting all admission requirements. Please visit the Admissions Office with your original documents within 14 days to complete the enrollment process.
      
      Required Documents:
      1. Original academic transcripts/certificates
      2. National ID card/Passport
      3. Passport-sized photographs (4)
      4. Medical fitness certificate
      
      Fee Structure:
      - Admission Fee: PKR 25,000 (one-time, non-refundable)
      - Tuition Fee: PKR 150,000 per semester
      - Security Deposit: PKR 10,000 (refundable)
      
      Payment Deadline: July 15, 2025
      
      We look forward to welcoming you to our university. If you have any questions, please contact the Admissions Office at admissions@uol.edu.pk or call +92-42-111-865-865.
      
      Sincerely,
      
      Dr. Amir Khan
      Director of Admissions
      University of Lahore
    `;
    
    setAdmissionLetter(letter);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admission Application</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Progress:</span>
              <Progress value={progress} className="w-40" />
              <span className="text-sm font-medium">{progress}%</span>
            </div>
          </div>
          
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>AI Admission Assistant</CardTitle>
              <CardDescription>
                Our AI assistant will guide you through the admission process, analyze your documents, and recommend suitable programs.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="letter">Admission Letter</TabsTrigger>
                </TabsList>
                
                {/* Chat Tab */}
                <TabsContent value="chat" className="p-4">
                  <div className="flex flex-col h-[500px]">
                    <ScrollArea className="flex-1 pr-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`flex items-start space-x-2 max-w-[80%] ${
                                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                              }`}
                            >
                              <Avatar className="h-8 w-8">
                                {message.role === 'assistant' ? (
                                  <>
                                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                                  </>
                                ) : (
                                  <>
                                    <AvatarFallback className="bg-muted">
                                      <User className="h-4 w-4" />
                                    </AvatarFallback>
                                  </>
                                )}
                              </Avatar>
                              <div
                                className={`rounded-lg p-3 ${
                                  message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    
                    <Separator className="my-4" />
                    
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isProcessing || isComplete}
                      />
                      <Button type="submit" disabled={isProcessing || !input.trim() || isComplete}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TabsContent>
                
                {/* Documents Tab */}
                <TabsContent value="documents" className="p-4">
                  <div className="flex flex-col h-[500px]">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Please upload your academic transcripts, ID card/passport, and any other relevant certificates.
                        Our AI will scan and extract information from these documents.
                      </p>
                      
                      <div className="grid gap-4">
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop files here, or click to browse
                          </p>
                          <Input
                            type="file"
                            multiple
                            className="hidden"
                            id="document-upload"
                            onChange={handleDocumentUpload}
                          />
                          <Label htmlFor="document-upload" asChild>
                            <Button variant="secondary" size="sm">
                              Browse Files
                            </Button>
                          </Label>
                        </div>
                        
                        {studentInfo.documents.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Uploaded Documents</h4>
                            <div className="space-y-2">
                              {studentInfo.documents.map((doc) => (
                                <div
                                  key={doc.id}
                                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                      <p className="text-sm font-medium">{doc.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {doc.type}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    {doc.status === 'pending' ? (
                                      <div className="flex items-center">
                                        <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse mr-2"></div>
                                        <span className="text-xs">Processing...</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center">
                                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs">Processed</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab('chat')}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Chat
                      </Button>
                      <Button
                        onClick={handleProcessDocuments}
                        disabled={
                          studentInfo.documents.length === 0 ||
                          studentInfo.documents.some((doc) => doc.status === 'pending')
                        }
                      >
                        Process Documents
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Recommendations Tab */}
                <TabsContent value="recommendations" className="p-4">
                  <div className="flex flex-col h-[500px]">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Recommended Programs</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Based on your profile, academic background, and interests, our AI has recommended the following programs for you.
                        Select the one you're interested in to proceed with your application.
                      </p>
                      
                      <div className="space-y-4">
                        {recommendedDegrees.map((degree) => (
                          <Card key={degree.id} className={`border ${selectedDegree?.id === degree.id ? 'border-primary' : ''}`}>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle>{degree.name}</CardTitle>
                                <div className="bg-muted px-2 py-1 rounded-full text-xs font-medium">
                                  {degree.match}% Match
                                </div>
                              </div>
                              <CardDescription>{degree.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="font-medium">Requirements</p>
                                  <p className="text-muted-foreground">{degree.requirements}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Duration</p>
                                  <p className="text-muted-foreground">{degree.duration}</p>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button
                                variant={selectedDegree?.id === degree.id ? "default" : "outline"}
                                className="w-full"
                                onClick={() => handleSelectDegree(degree)}
                              >
                                {selectedDegree?.id === degree.id ? "Selected" : "Select Program"}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab('chat')}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Chat
                      </Button>
                      {selectedDegree && (
                        <Button onClick={() => {
                          setActiveTab('chat');
                          sendMessage(`Selected ${selectedDegree.name}`);
                        }}>
                          Continue with {selectedDegree.name}
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Admission Letter Tab */}
                <TabsContent value="letter" className="p-4">
                  <div className="flex flex-col h-[500px]">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Your Admission Letter</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Congratulations! Here is your provisional admission letter. Please download it and follow the instructions to complete your enrollment.
                      </p>
                      
                      <div className="border rounded-lg p-6 bg-white">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="h-8 w-8 text-primary" />
                            <h2 className="text-xl font-bold">University of Lahore</h2>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        
                        <ScrollArea className="h-80">
                          <div className="space-y-4">
                            <div className="text-center mb-6">
                              <h3 className="text-lg font-bold">PROVISIONAL ADMISSION LETTER</h3>
                            </div>
                            
                            <p>Dear {studentInfo.name},</p>
                            
                            <p>
                              Congratulations! We are pleased to inform you that you have been provisionally admitted to the {selectedDegree?.name} program at the University of Lahore for the upcoming academic session.
                            </p>
                            
                            <div>
                              <p className="font-medium">Program Details:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Program: {selectedDegree?.name}</li>
                                <li>Duration: {selectedDegree?.duration}</li>
                                <li>Starting Date: August 15, 2025</li>
                              </ul>
                            </div>
                            
                            <p>
                              This admission is subject to verification of your original documents and meeting all admission requirements. Please visit the Admissions Office with your original documents within 14 days to complete the enrollment process.
                            </p>
                            
                            <div>
                              <p className="font-medium">Required Documents:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Original academic transcripts/certificates</li>
                                <li>National ID card/Passport</li>
                                <li>Passport-sized photographs (4)</li>
                                <li>Medical fitness certificate</li>
                              </ul>
                            </div>
                            
                            <div>
                              <p className="font-medium">Fee Structure:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Admission Fee: PKR 25,000 (one-time, non-refundable)</li>
                                <li>Tuition Fee: PKR 150,000 per semester</li>
                                <li>Security Deposit: PKR 10,000 (refundable)</li>
                              </ul>
                            </div>
                            
                            <p>
                              <span className="font-medium">Payment Deadline:</span> July 15, 2025
                            </p>
                            
                            <p>
                              We look forward to welcoming you to our university. If you have any questions, please contact the Admissions Office at admissions@uol.edu.pk or call +92-42-111-865-865.
                            </p>
                            
                            <div className="mt-6">
                              <p>Sincerely,</p>
                              <p className="font-medium mt-4">Dr. Amir Khan</p>
                              <p>Director of Admissions</p>
                              <p>University of Lahore</p>
                            </div>
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab('chat')}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Chat
                      </Button>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download Letter
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Authentication Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>
              Please sign in or create an account to continue chatting with the admission assistant.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-3 mt-4">
            <Link href="/login" className="w-full">
              <Button className="w-full">Sign In</Button>
            </Link>
            <p className="text-center text-sm text-muted-foreground">or</p>
            <Link href="/signup" className="w-full">
              <Button variant="outline" className="w-full">Create Account</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdmissionChatbot;