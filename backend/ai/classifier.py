def predictions_from_result(result):
    if result.probs is None:
        return []
    return [{'species_id': str(result.names[i]).lower().replace('_', '-').replace(' ', '-'),
        'confidence': float(result.probs.data[i])} for i in result.probs.top5]
