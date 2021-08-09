import React from 'react'
import { useUserContext } from '../context/user_context';
import { PageHero } from '../components';
import styled from 'styled-components';

const Profile=() =>{
const { myUser, setMyUser } = useUserContext();
// console.log("myUser", myUser)
  return (
    <main>
      <PageHero title='profile' />
      <Wrapper className='page section section-center'>
       <div style={{display:"flex", flexDirection:"row"}}>
         {console.log("myUser", myUser)}
         <div style={{width:180}}>
            Name:
         </div>
         <div>
              {myUser.name}
         </div>
       </div>
       <div style={{display:"flex", flexDirection:"row"}}>
         <div style={{width:180}}>
            Phone:
         </div>
         <div>
              {/* {myUser.mobile} */}
         </div>
       </div>
       <div style={{display:"flex", flexDirection:"row"}}>
         <div style={{width:180}}>
            Address:
         </div>
         <div>
              {/* {myUser.address} */}
         </div>
       </div>
       <div style={{display:"flex", flexDirection:"row"}}>
         <div style={{width:180}}>
            PIN Code:
         </div>
         <div>
              {/* {myUser.pin} */}
         </div>
       </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default Profile
