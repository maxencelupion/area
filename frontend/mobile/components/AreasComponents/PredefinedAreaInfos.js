import {getServiceColor, getServiceIcon} from "../Utils/GetServicesData";

function PredefinedAreasInfos(_services, _actions, _reactions, _width, _height, _listSize) {
  const createPredefinedCard = (cards) => {
    if (_actions.length === 0 || _reactions.length === 0) return null;

    const random_action = _actions[Math.floor(Math.random() * _actions.length)];
    const random_reaction = _reactions[Math.floor(Math.random() * _reactions.length)];

    const service_action = _services.find(service => service.id === random_action.serviceId);
    const service_reaction = _services.find(service => service.id === random_reaction.serviceId);

    if (!service_action || !service_reaction) {
      console.error("Service not found");
      return null;
    }

    const alreadyInList = cards.some(item =>
      item._actionId === random_action.id && item._reactionId === random_reaction.id
    );

    if (alreadyInList) {
      return null;
    }

    return {
      _width: _width,
      _height: _height,
      _color: getServiceColor(service_action.front_data),
      _service: random_action.name,
      _action: random_action.description,
      _reaction: random_reaction.description,
      _actionIcon: getServiceIcon(service_action.front_data),
      _reactionIcon: getServiceIcon(service_reaction.front_data),
      _actionId: random_action.id,
      _reactionId: random_reaction.id,
    };
  };

  const cards = [];
  for (let i = 0; i < _listSize; i++) {
    const newCard = createPredefinedCard(cards);
    if (newCard) cards.push(newCard);
  }

  return cards;
}

export {PredefinedAreasInfos};