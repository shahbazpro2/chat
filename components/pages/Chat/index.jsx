import Header from '@common/Header'
import React from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

const Chat = () => {
    return (
        <div>
            <Header />
            <div className="grid grid-cols-12 gap-7 p-16" >
                <div className="col-span-3">
                    <LeftSide />
                </div>
                <div className="col-span-9">
                    <RightSide />
                </div>
            </div>
        </div>
    )
}

export default Chat