import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import ModelView from './ModelView'
import { yellowImg } from '../utils';
import * as THREE from 'three'
import { Canvas, } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { models, sizes } from '../constants';




export default function Model() {
    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['#8F8A81', '#FFE789', '#6F6C64'],
        img: yellowImg,
    });
    // camera conrol for the model view
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    // keep track of the model to access its properties when animating
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())


    // rotation value
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0)
    const timeline = useRef(gsap.timeline()).current;

    const animateWithGsapTimeline = ({ rotationRef, rotationState, firstTarget, secondTarget, animationProps }) => {
        timeline.to(
            rotationRef.current.rotation,
            {
                y: 0,
                duration: 1,
                ease: "power2.out"
            }
        );
        timeline.to(
            rotationRef.current.rotation,
            {
                y: rotationState,
                duration: 1,
                ease: "power2.out",
            }
        )

        timeline.to(
            firstTarget,
            {
                ...animationProps,
                ease: 'power2.inOut'
            },
            '<'
        )

        timeline.to(
            secondTarget,
            {
                ...animationProps,
                ease: 'power2.inOut'
            },
            '>'
        )
    }

    useEffect(() => {
        // set the model to the selected model
        if (size === 'large') {
            animateWithGsapTimeline({
                rotationRef: small,
                rotationState: largeRotation,
                firstTarget: '#view1',
                secondTarget: '#view2',
                animationProps: {
                    transform: 'translateX(-100%)',
                    duration: 2
                }
            })
        }
        if (size === 'small') {
            animateWithGsapTimeline({
                rotationRef: large,
                rotationState: smallRotation,
                firstTarget: '#view2',
                secondTarget: '#view1',
                animationProps: {
                    transform: 'translateX(0)',
                    duration: 2
                }
            })
        }
    }, [size, smallRotation, largeRotation])

    
    useEffect(() => {
        // Rotate the model when the size changes
        if (size === 'large') {
            timeline.to(
                large.current.rotation,
                {
                    y: Math.PI / 4,
                    duration: 1,
                    ease: "power1.out"
                }
            );
        } else {
            timeline.to(
                small.current.rotation,
                {
                    y: Math.PI / 4,
                    duration: 1,
                    ease: "power1.out"
                }
            );
        }
    }, [size, timeline]);
    
    useGSAP(() => {
        gsap.to('#heading', {
            opacity: 1,
            y: 0,
            duration: 1,
        })
    })
    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <h1 id='heading' className='section-heading'>
                    Take a closer look.
                </h1>
                <div className='flex flex-col items-center mt-5'>
                    <div className="w-full h-[80vh] md:h-[90vh] overflow-hidden relative">
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType="view1"
                            controlRef={cameraControlSmall}
                            setRotationState={setSmallRotation}
                            item={model}
                            size={size}
                        />
                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType="view2"
                            controlRef={cameraControlLarge}
                            setRotationState={setLargeRotation}
                            item={model}
                            size={size}

                        />

                        <Canvas className='w-full h-full top-0 left-0 ' style={{
                            overflow: 'hidden',
                            position:'fixed'
                            
                        }}
                            eventSource={document.getElementById('root')}
                        >
                            <View.Port />
                        </Canvas>
                    </div>
                    <div className='mx-auto w-full relative'>
                        <p className='text-sm font-light text-center mb-5 mt-5'>{model.title}</p>
                        <div className='flex-center'>
                            <ul className='color-container'>
                                {models.map((item, i) => (
                                    <li key={i} className='w-6 h-6 rounded-full mx-2 cursor-pointer' style={{ backgroundColor: item.color[0] }}
                                        onClick={() => setModel(item)}
                                    />
                                ))}
                            </ul>
                            <button className='size-btn-container' >
                                {sizes.map(({ label, value }) => (
                                    <span key={label} className='size-btn'
                                        style={{
                                            backgroundColor: size === value ? 'white' :
                                            'transparent',
                                            color: size === value ? 'black' : 'white'
                                        }}
                                        onClick={() => setSize(value)}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
