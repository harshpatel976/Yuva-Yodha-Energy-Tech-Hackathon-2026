import React, { useState, useEffect, useRef } from 'react';
import { useFarmContext } from '../context/FarmContext';
import type { Language } from '../types';
import { Mic, Volume2, X, Play, Globe } from 'lucide-react';

const palette = {
  parchment: '#EAE3CD',
  panel: '#F6F1E3',
  ink: '#262B1E',
  inkSoft: '#5C6350',
  line: '#CDC3A0',
  green: '#3E6B45',
  greenDeep: '#26422B',
  water: '#2E6C89',
  ochre: '#B0651E',
};

const SAMPLE_QUERIES: Record<Language, { question: string; answer: string }[]> = {
  hi: [
    { question: 'Mere khet ko paani kab dena hai?', answer: 'Aapke khet mein abhi 26% nami hai. Kal subah 7 baje 25 minute sinchai karna uchit rahega kyunki baarish ki sambhavna kam hai.' },
    { question: 'Kitna paani bacha hai iss mahine?', answer: 'Aapne Smart Water Guardian se iss mahine 14,500 liter paani aur ₹1,435 bijli ka bil bachaya hai.' },
    { question: 'Aaj ka mausam kaisa rahega?', answer: 'Aaj Ludhiana mein taapmaan 34°C rahega. Halka badal chhaaye rahenge.' },
  ],
  en: [
    { question: 'When should I irrigate my field?', answer: 'Soil moisture is at 26%. Rain probability is 75% tomorrow. Delay irrigation by 18 hours to save 4,200L water.' },
    { question: 'How much water did I save this month?', answer: 'You have conserved 14,500 liters of water and saved ₹1,435 in electricity bills.' },
    { question: "What is today's weather forecast?", answer: 'Temperature is 34°C with 62% humidity. Partly cloudy conditions expected.' },
  ],
  pa: [{ question: 'ਮੇਰੇ ਖੇਤ ਨੂੰ ਪਾਣੀ ਕਦੋਂ ਦੇਣਾ ਹੈ?', answer: 'ਤੁਹਾਡੇ ਖੇਤ ਵਿੱਚ ਨਮੀ 26% ਹੈ। ਕੱਲ੍ਹ ਸਵੇਰੇ 7 ਵਜੇ ਸਿੰਚਾਈ ਕਰੋ।' }],
  gu: [{ question: 'મારા ખેતરમાં પાણી ક્યારે આપવું?', answer: 'જમીનમાં ભેજ 26% છે. આવતીકાલે સવારે 7 વાગ્યે સિંચાઈ કરો.' }],
  mr: [{ question: 'माझ्या शेताला पाणी कधी द्यायचे?', answer: 'मातीत २६% ओलावा आहे. उद्या सकाळी ७ वाजता सिंचन करा.' }],
  ta: [{ question: 'எனது வயலுக்கு எப்போது நீர் பாய்ச்ச வேண்டும்?', answer: 'மண்ணின் ஈரம் 26%. நாளை காலை 7 மணிக்கு நீர் பாய்ச்சவும்.' }],
};

export const VoiceAssistantModal: React.FC = () => {
  const { isVoiceAssistantOpen, setIsVoiceAssistantOpen, language, setLanguage } = useFarmContext();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechResponse, setSpeechResponse] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const sampleList = SAMPLE_QUERIES[language] || SAMPLE_QUERIES['en'];

  useEffect(() => {
    if (isVoiceAssistantOpen) {
      setSpeechResponse('Namaste! Ask me anything about irrigation, weather, or pump control.');
      closeBtnRef.current?.focus();
    }
  }, [isVoiceAssistantOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVoiceAssistantOpen) {
        setIsVoiceAssistantOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVoiceAssistantOpen, setIsVoiceAssistantOpen]);

  if (!isVoiceAssistantOpen) return null;

  const handleSimulateVoiceQuery = (queryObj: { question: string; answer: string }) => {
    setIsListening(true);
    setTranscript(queryObj.question);
    setSpeechResponse(null);

    setTimeout(() => {
      setIsListening(false);
      setSpeechResponse(queryObj.answer);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(queryObj.answer);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(38,43,30,0.65)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-assistant-title"
    >
      <div
        className="w-full max-w-xl p-6 sm:p-8 space-y-6"
        style={{ backgroundColor: palette.panel, border: `1px solid ${palette.line}`, color: palette.ink }}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4" style={{ borderBottom: `1px solid ${palette.line}` }}>
          <div>
            <h3 id="voice-assistant-title" className="font-serif text-2xl">Smart farmer voice assistant</h3>
            <p className="text-xs mt-0.5" style={{ color: palette.inkSoft }}>
              Multilingual speech recognition and voice synthesis
            </p>
          </div>
          <button
            ref={closeBtnRef}
            onClick={() => setIsVoiceAssistantOpen(false)}
            aria-label="Close voice assistant dialog"
            className="w-9 h-9 flex items-center justify-center transition-colors"
            style={{ border: `1px solid ${palette.line}`, color: palette.inkSoft }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language selection — underlined tabs, not a pill grid */}
        <div>
          <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: palette.inkSoft }}>
            <Globe className="w-3.5 h-3.5" /> Voice language
          </div>
          <div className="flex flex-wrap gap-5 text-sm" style={{ borderBottom: `1px solid ${palette.line}` }}>
            {(['en', 'hi', 'pa', 'gu', 'mr', 'ta'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                className="pb-2 min-h-[36px] uppercase"
                style={{
                  color: language === lang ? palette.ink : palette.inkSoft,
                  borderBottom: language === lang ? `2px solid ${palette.green}` : '2px solid transparent',
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Microphone */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <button
            onClick={() => handleSimulateVoiceQuery(sampleList[0])}
            aria-label="Activate voice microphone input"
            className="w-20 h-20 rounded-full flex items-center justify-center transition-all text-white"
            style={{ backgroundColor: isListening ? palette.ochre : palette.green }}
          >
            <Mic className="w-9 h-9" />
          </button>

          <div className="text-center space-y-1">
            <div className="text-xs" style={{ color: palette.inkSoft }}>
              {isListening ? 'Listening to your voice…' : 'Tap the mic, or choose a prompt below'}
            </div>
            {transcript && (
              <div className="text-xs font-mono italic" style={{ color: palette.green }}>
                "{transcript}"
              </div>
            )}
          </div>
        </div>

        {/* Response — a field note, not a labeled box */}
        {speechResponse && (
          <div className="pl-3 space-y-1" style={{ borderLeft: `2px solid ${palette.green}` }}>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: palette.green }}>
              <Volume2 className="w-3.5 h-3.5" /> Assistant
            </div>
            <p className="text-sm leading-relaxed">{speechResponse}</p>
          </div>
        )}

        {/* Sample queries — a hairline-divided list */}
        <div className="space-y-2">
          <div className="text-xs" style={{ color: palette.inkSoft }}>
            Sample queries ({language.toUpperCase()})
          </div>
          <div>
            {sampleList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateVoiceQuery(item)}
                className="w-full text-left py-3 flex items-center justify-between group min-h-[44px]"
                style={{ borderBottom: `1px solid ${palette.line}` }}
              >
                <span className="text-sm">"{item.question}"</span>
                <Play className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: palette.green }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};