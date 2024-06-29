import React from 'react'
import InfoBox from './InfoBox'

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
    
          <InfoBox
          heading='For renters'
          backgroundColor='bg-gray-200'
          buttonInfo={{
            text:'Browse properties',
            link:'/properties',
            backgroundColor:'bg-black '
          }}
      >
        Find your dream rental property.Bookmark property and contact

         </InfoBox>
         <InfoBox
          heading='For Owners'
          backgroundColor='bg-blue-500'
          buttonInfo={{
            text:'Browse add property',
            link:'/properties/add',
            backgroundColor:'bg-blue-500 '
          }}
         >
        Find your dream rental property.Bookmark property and contact

         </InfoBox>
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes
