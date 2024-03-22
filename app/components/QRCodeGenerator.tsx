'use client'
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import QRCode from 'react-qr-code';
import QRCodeStyling, {
    DrawType,
    TypeNumber,
    Mode,
    ErrorCorrectionLevel,
    DotType,
    CornerSquareType,
    CornerDotType,
    Options,
    FileExtension
  } from "qr-code-styling";

interface QrCodeGeneratorProps { }

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialText= urlParams.get('q') || "https://seds.kz";
    const [text, setText] = useState(initialText);
    const [size, setSize] = useState(256);
    const [selectedTheme, setSelectedTheme] = useState('default');
    const [useLogo, setUseLogo] = useState(false);
    const colorThemes = {
        default: {
            bgColor: 'transparent',
            fgColor: '#3b76c4',
            squareBg: 'theme-seds'
        },
        theme1: {
            bgColor: 'transparent',
            fgColor: '#000000',
            squareBg: 'theme-black'
        },
        theme2: { 
            bgColor: 'transparent',
            fgColor: '#ffffff',
            squareBg: 'theme-white'
        }
    };


    const [options, setOptions] = useState<Options>({
        width: 300,
        height: 300,
        type: 'png' as DrawType,
        data: text,
        image: '/logo.png',
        margin: 5,
        qrOptions: {
          typeNumber: 0 as TypeNumber,
          mode: 'Byte' as Mode,
          errorCorrectionLevel: 'H' as ErrorCorrectionLevel
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.6,
          margin: 5,
          crossOrigin: 'anonymous',
        },
        dotsOptions: {
          color: colorThemes[selectedTheme as keyof typeof colorThemes].fgColor,
          type: 'rounded' as DotType
        },
        backgroundOptions: {
            color: colorThemes[selectedTheme as keyof typeof colorThemes].bgColor,

        },
        cornersSquareOptions: {
            color: colorThemes[selectedTheme as keyof typeof colorThemes].fgColor,
          type: 'extra-rounded' as CornerSquareType,

        },
        cornersDotOptions: {
            color: colorThemes[selectedTheme as keyof typeof colorThemes].fgColor,
          type: 'dot' as CornerDotType,

        }
      });

    const [fileExt, setFileExt] = useState<FileExtension>("png");
    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        setOptions(options => ({
            ...options,
            data: text,
            image: useLogo ? (colorThemes[selectedTheme as keyof typeof colorThemes].fgColor == "#000000" ? './blogo.png' : './logo.png') : undefined,
            dotsOptions: {
                ...options.dotsOptions,
                color: colorThemes[selectedTheme as keyof typeof colorThemes].fgColor,
            },
            backgroundOptions: {
                ...options.backgroundOptions,
                color: colorThemes[selectedTheme as keyof typeof colorThemes].bgColor,
            },
            cornersSquareOptions: {
                ...options.cornersSquareOptions,
                color: colorThemes[selectedTheme as keyof typeof colorThemes].fgColor,
            },
            cornersDotOptions: {
                ...options.cornersDotOptions,
                color: colorThemes[selectedTheme as keyof typeof colorThemes].fgColor,
            }
            }),

        );
    }, [text, selectedTheme, useLogo]);

    useEffect(() => {
        if (ref.current) {
          qrCode.append(ref.current);
        }
      }, [qrCode, ref]);
    
      useEffect(() => {
        if (!qrCode) return;
        qrCode.update(options);
      }, [qrCode, options]);
    
      const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOptions(options => ({
          ...options,
          data: event.target.value
        }));
      };
    
      const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFileExt(event.target.value as FileExtension);
      };
    
      const onDownloadClick = () => {
        if (!qrCode) return;
        qrCode.download({
          extension: fileExt
        });
      };
    
    return (
        <div className={`qr-interface-container`}>
            <div className="input-section">
                <label htmlFor="qr-text">Enter the URL: </label>
                <input className="input-stuff" type="text" id="qr-text" value={text} onChange={(e) => setText(e.target.value)} />
                
                <label htmlFor="theme-select">Color Theme:</label>
                <select className="input-stuff" id="theme-select" value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
                    <option value="default">SEDS Blue</option>
                    <option value="theme1">Transparent Black</option>
                    <option value="theme2">Transparent White</option>
                </select>

                <label htmlFor="use-logo">Use Logo:</label>
                <input className="input-stuff" type="checkbox" id="use-logo" checked={useLogo} onChange={(e) => setUseLogo(e.target.checked)} />
            </div>
            <div ref={ref} className={`ref ${colorThemes[selectedTheme as keyof typeof colorThemes].squareBg}`} id="qr-display"/>
            <button className="fresh-looking-button" onClick={onDownloadClick}>Download</button>
        </div>
    )
}

export default QrCodeGenerator;