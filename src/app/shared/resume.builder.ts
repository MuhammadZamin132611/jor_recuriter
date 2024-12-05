import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdFonts from 'pdfmake/build/vfs_fonts'
(<any>pdfMake).vfs=pdFonts.pdfMake.vfs;

export class resumeBuilder{
    getProfile(data: any) {
        const profile = {
          pageSize: {
            width: 595.28,
            height: 841.89
          },
          background: function () {
            return JSON.parse(JSON.stringify({
              canvas: [
                {
                  type: 'rect',
                  x: 0, y: 0, w: 250, h: 841.89,
                  color: '#00BFFF'
                }
              ]
            }));
          },
          content: [{
            columns: [
              {
                width: 200,
    
    
                stack: [
    
    
                  // {width:150,height:150,margin: JSON.parse(JSON.stringify([0,10,20,10])),
                  //   // image:'https://job-check.s3.ap-south-1.amazonaws.com/'+data.profilePictureUrl
                  // },
                  {
                    margin: [0, 10, 0, 10],
                    text: 'Contact', style: {
                      color: 'white',
                      fontSize: 20,
                      bold: true,
    
                    },
                  },
                  // {
                  //   text:'25-3-150 8TH CROSS STREETNETAJI NAGAR PODALAKURROAD NELLORE' ,color:'white',
                  // },
                  {
                    text: data.phoneNumber
                    , color: 'white',
                  }, {
                    text: data.email, color: 'white',
                  },
    
                  {
                    margin: JSON.parse(JSON.stringify([0, 10, 0, 10])),
                    text: 'Skills', style: {
                      fontSize: 20,
                      bold: true,
                      color: 'white',
                    },
                  }, {
                    color: 'white', type: JSON.parse(JSON.stringify('none')),
                    ul: [
                      ...data.skills
                    ]
                  },
                  // {
                  //   margin: JSON.parse(JSON.stringify([0, 10, 0, 10])),
                  //   text: 'Languages', style: {
                  //     fontSize: 20,
                  //     bold: true,
                  //     color: 'white'
                  //   },
                  // },
                  // JSON.parse(JSON.stringify(this.getlanguages(data.languages)))
                ],
    
    
              },
              {
                width: 380,
                marginTop: -20, marginLeft: 20, marginRight: 10,
    
                stack: [
                  {
                    text: data.name, style: {
                      fontSize: 30,
                      bold: true,
    
                    },
    
                  },
    
                  {
                    margin: JSON.parse(JSON.stringify([0, 10, 20, 0])),
                    text: 'Summary', style: {
                      fontSize: 18,
                      bold: true,
    
                    },
                  }, 
                  // {
                  //   margin: JSON.parse(JSON.stringify([0, 10, 20, 0])), fontSize: 12,
                
                  //   text:this.getPersonalBio(data.personalBio)
                  // },
                  {
                    margin: JSON.parse(JSON.stringify([0, 30, 20, 0])),
                    text: 'Experience', style: {
                      fontSize: 20,
                      bold: true,
    
                    },
                  }, 
                  JSON.parse(JSON.stringify(this.getExpeince(data.workExperienceDtos))),
                  {
                    margin: JSON.parse(JSON.stringify([0, 30, 20, 0])),
                    text: 'Education', style: {
                      fontSize: 20,
                      bold: true,
    
                    },
                  }, 
                  JSON.parse(JSON.stringify(this.getEducaion(data.educationalDetailsDtos)))
    
    
                ],
    
    
    
                
              },],
          },
           
          ]
        }
        // pdfMake.createPdf(profile).open()
    
        pdfMake.createPdf(profile).getBlob(blob=>{
          const blobs=new Blob([blob],{type:'application/pdf'});
    
        //   var win = window.open(blobs, '_blank');
          var downloadURL=window.URL.createObjectURL(blob);
          var link=document.createElement('a');
          link.href=downloadURL;
          link.download=data.name+' '+'Resume';
          link.click();
        })
      }
    
    
    
      getlanguages(lang: any) {
        if (lang.length > 0) {
          const value =
          {
            color: 'white', type: JSON.parse(JSON.stringify('none')),
            ul: [
              ...lang
            ]
          }
    
          return value;
    
        }
        return null;
    
      }
    
      getExpeince(esp:any){
        if(esp.length>0){
          const expe=[];
          for(let exp of esp){
    expe.push(
      {
        margin: JSON.parse(JSON.stringify([0, 10, 20, 0])),
        stack: [{
          fontSize: 14,
          text: exp.companyName
        }, {
          fontSize: 12, color: 'gray',
          text: exp.jobTitle
        }
          , {
            margin: JSON.parse(JSON.stringify([0, 20, 10, 0])), fontSize: 12,
          text: exp.description
        }
        ]
      }
    )
          }
          return  {ul: [
            ...expe,
         
          ]}
        }
        return null;
      }
    
      getEducaion(education:any){
    if(education.length>0){
      const educationList=[]
      for(let edu of education){
        educationList.push(
          {
            margin: JSON.parse(JSON.stringify([0, 30, 20, 0])),
            stack: [{
              fontSize: 14,
              text: edu.course +'   at    '+edu.specialization
            }, {
              fontSize: 12, color: 'gray',margin:JSON.parse(JSON.stringify([100,0,10,0])),
              text: new Date(edu.startDate).getFullYear() +'  -  '+new Date (edu.endDate).getFullYear()
            }
    
            ]
          }
        )
      }
      return {
        ul:[
          ...educationList
        ]
      }
    }
    return null;
      }
    
      getPersonalBio(bio:any){
        if(bio!=''&&bio!=null&&bio!='NA'){
          return bio;
        }
        return 'Looking for opportunities to incorporate my skills and training to help the company grow. I am looking forward to roles that will help me realise my potential by exploring the various aspects of this field.'
    
      }
}