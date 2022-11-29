import React, { useState, useEffect } from "react"

const ConfigureHeartRate = ({lactateThreshold, onLactateThresholdSubmit}) => {
    const [newLactateThreshold, setNewLactateThreshold] = useState(0);
    const [zones, setZones] = useState({});

    const setZonesFunc = (lt) => {
        let zone1Min = Math.round(lt * 0.75);
        let zone1Max = Math.round(lt * 0.80);
        let zone2Min = Math.round(lt * 0.81);
        let zone2Max = Math.round(lt * 0.89);
        let zone3Min = Math.round(lt * 0.96);
        let zone3Max = Math.round(lt * 1.0);
        let zone4Min = Math.round(lt * 1.02);
        let zone4Max = Math.round(lt * 1.05);
        let zone5Min = Math.round(lt * 1.06);
        
        let zones = {
            "zone1Min":zone1Min,
            "zone1Max":zone1Max,
            "zone2Min":zone2Min,
            "zone2Max":zone2Max,
            "zone3Min":zone3Min,
            "zone3Max":zone3Max,
            "zone4Min":zone4Min,
            "zone4Max":zone4Max,
            "zone5Min":zone5Min,
            }

        setZones(zones);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onLactateThresholdSubmit(newLactateThreshold);
        // TODO - refactor? We don't wait for the DB update of lactate threshold to update the zones
        // might be confusing if the DB transaction fails and on refresh the zones change back. 
        // But with this there's no delay.
        setZonesFunc(newLactateThreshold);
    }


    useEffect( () => {
        setZonesFunc(lactateThreshold);
    }, []);
    
    return (
        <>
        <div>
            <h3>Calculate your heart rate zones based on your lactate threshold</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control"> 
                    <label><span className="heart-rate-zone-large zone1">1</span> Low Aerobic: <strong>{zones["zone1Min"]}-{zones["zone1Max"]}</strong></label>
                    <label><span className="heart-rate-zone-large zone2">2</span> Moderate Aerobic: <strong>{zones["zone2Min"]}-{zones["zone2Max"]}</strong></label>
                    <label><span className="heart-rate-zone-large zone3">3</span> Threshold: <strong>{zones["zone3Min"]}-{zones["zone3Max"]}</strong></label>
                    <label><span className="heart-rate-zone-large zone4">4</span> Vo2 Max: <strong>{zones["zone4Min"]}-{zones["zone4Max"]}</strong></label>
                    <label><span className="heart-rate-zone-large zone5">5</span> Speed: <strong>{zones["zone5Min"]}+</strong></label>
                    <label>Saved lactate threshold: <strong>{lactateThreshold}</strong></label>
                    <span>New lactate threshold: </span>
                    <input className="inline" type="text" onChange={(e) => setNewLactateThreshold(parseInt(e.target.value))} /> 
                    <input type="submit" className="btn" value="Update" />
                </div>
            </form>
        </div>
        </>
    )
}

export default ConfigureHeartRate 