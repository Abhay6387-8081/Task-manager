/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors:{
        brand:{
          50:'#EEF2FF',
          100:'#E0E7FF',
          500:'#6366F1',
          600:'#4F46E5',
          700:'#4338CA',
        },
        surface:{
          bg:'#F8FAFC',
          card:'#FFFFFF',
          dark:'#0F172A'
        },
        ink:{
          900:'#0F172A',
          700:'#334155',
          500:'#64748D',
          300:'#CBD5E1',
        },
        status:{
          todo:'#64748D',
          progress:'#D97706',
          completed:'#16A34A'
        },
        priority:{
          low:'#16A34A',
          medium:'#D97706',
          high:'#DC2626'
        },
        success:'#16A34A',
        danger:'#DC2626',
        warning:'#D97706'
      },
      fontFamily:{
        sans:['Inter','ui-sans-serif','system-ui','sans-serif'],
      },
      borderRadius:{
        card:'12px'
      },
      boxShadow:{
        card:'0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)',
        cardHover:'0 8px 20px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}

