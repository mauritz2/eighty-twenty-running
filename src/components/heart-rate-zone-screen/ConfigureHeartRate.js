import React, { useState, useEffect } from "react"

const ConfigureHeartRate = ({lactateThreshold, onLactateThresholdSubmit}) => {
    // Component owns taking input on new lactate threshold, writing to DB, and calculating and displaying heart rate zones
    const [newLactateThreshold, setNewLactateThreshold] = useState(0);
    const [zones, setZones] = useState({});

    const setZonesFunc = (lt) => {
        // Calculate the bounds of the heart rate zones and update in state
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
        // Write the new lactate threshold to the DB and update the heart rate zones
        e.preventDefault();
        onLactateThresholdSubmit(newLactateThreshold);
        // We don't wait for the DB update of lactate threshold to update the zones here
        // The result is that the zones on the page update instantly, and then the "Current lactate threshold"
        // updates about 1 sec after when the DB has updated. Fine with me. 
        // Could be confusing if the DB transaction fails and on refresh the zones change back. 
        setZonesFunc(newLactateThreshold);
    }


    useEffect( () => {
        // Update the heart rate zones based on the current lactate threshold
        setZonesFunc(lactateThreshold);
    }, []);
    
    return (
        <>
        <div>
            <h3 className="table-heading">Calculate your heart rate zones based on your lactate threshold</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control"> 
                    <label className="block"><span className="heart-rate-zone-large zone1">1</span> Low Aerobic: <strong>{zones["zone1Min"]}-{zones["zone1Max"]}</strong></label>
                    <label className="block"><span className="heart-rate-zone-large zone2">2</span> Moderate Aerobic: <strong>{zones["zone2Min"]}-{zones["zone2Max"]}</strong></label>
                    <label className="block"><span className="heart-rate-zone-large zone3">3</span> Threshold: <strong>{zones["zone3Min"]}-{zones["zone3Max"]}</strong></label>
                    <label className="block"><span className="heart-rate-zone-large zone4">4</span> Vo2 Max: <strong>{zones["zone4Min"]}-{zones["zone4Max"]}</strong></label>
                    <label className="block"><span className="heart-rate-zone-large zone5">5</span> Speed: <strong>{zones["zone5Min"]}+</strong></label>
                    <label className="block">Saved lactate threshold: <strong>{lactateThreshold}</strong></label>
                    <span>New lactate threshold: </span>
                    <input className="inline" type="text" onChange={(e) => setNewLactateThreshold(parseInt(e.target.value))} /> 
                    <input type="submit" className="btn block" value="Update" />
                </div>
            </form>
        </div>
        </>
    );
}

export default ConfigureHeartRate;