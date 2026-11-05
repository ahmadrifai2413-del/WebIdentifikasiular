def predictions_from_result(result):
    predictions = []
    if result.boxes is not None:
        for box in result.boxes:
            index = int(box.cls[0])
            predictions.append({'species_id': str(result.names[index]).lower().replace('_', '-').replace(' ', '-'),
                'confidence': float(box.conf[0]), 'box': box.xyxyn[0].tolist()})
    return predictions
