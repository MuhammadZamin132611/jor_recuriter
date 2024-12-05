/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    // spacing: {
    //   '17':'72px',
    //   '97':'438px',
    //   '95':'450px',
    //   '22':'86px',
    //   '26':'105px',
    //   '69':'267px',
    //   '73': '73px',
    //   '45': '184px',
    //   '99': '644px',
    //   '82':'360px',
    //   '81': '350px',
    //   '104' :'673px',
    //   '42': '165px',
    //   '700':'700px',
    //   '750':'730px',
    //   '50':'766px',
    //   '186': '186px',
    //   '800': '800px',
    //   '98': '431px',
    //   '100':'380px',
    //   '102': '550px',
    //   '103':'592px',
    //   '105':'640',
    //   '944':'830px',
    //   '592':'592px',
    //   '648':'648px',
    //   'xxlg':'1440px',
    //   'xlg':'800px', 
    //   '850': '850px',
    //   '950':'950px',
    //   '71':'274px'
    
      
    // },
    colors: {

      'log': ' #B42318',
      'grad1': '#70707B',
      'grad2': '#A0A0AB',
      'membership':'rgba(16, 24, 40, 0.1)',
      'titles':'#667085',
      'hr':'#EAECF0',
      'gr1':'#ECFDF3',
      'gr2':'#027A48'
    },
    
    extend: {},
  },
  keyframes: {
    'fade-in-up': {
      '0%': {
        opacity: '1',
        transform: 'translateY(250px)'
      },
      '100%': {
        opacity: '1',
        transform: 'translateY(0)'
      },
    },
    'fade-in-out': {
      '0%': {
        opacity: '1',
        transform: 'translateX(250px)'
      },
      '100%': {
        opacity: '1',
        transform: 'translateX(0)'
      },
    },
    'fade-in-up-blur': {
      '0%': {
        opacity: '1',
        transform: 'translateY(250px)'
      },
      '100%': {
        opacity: '1',
        transform: 'translateY(0)'
      },
    },
  },
  animation: {
    'fade-in-out': 'fade-in-out 2s ',
    'fade-in-up': 'fade-in-up 2s ',
    'fade-in-up-blur': 'fade-in-up 2s ',
  },
  plugins: [],
}