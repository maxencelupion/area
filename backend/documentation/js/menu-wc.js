'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ActionRegistryModule.html" data-type="entity-link" >ActionRegistryModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ActionRegistryModule-3210029923bbb5d2acde9d1b812ef24be4ab779bbb17ee7d96ca2bbce2c26abe0655c1b4603a005a8d0adc28f56968e287cd69ef06ab33bca325d87531147c9d"' : 'data-bs-target="#xs-injectables-links-module-ActionRegistryModule-3210029923bbb5d2acde9d1b812ef24be4ab779bbb17ee7d96ca2bbce2c26abe0655c1b4603a005a8d0adc28f56968e287cd69ef06ab33bca325d87531147c9d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ActionRegistryModule-3210029923bbb5d2acde9d1b812ef24be4ab779bbb17ee7d96ca2bbce2c26abe0655c1b4603a005a8d0adc28f56968e287cd69ef06ab33bca325d87531147c9d"' :
                                        'id="xs-injectables-links-module-ActionRegistryModule-3210029923bbb5d2acde9d1b812ef24be4ab779bbb17ee7d96ca2bbce2c26abe0655c1b4603a005a8d0adc28f56968e287cd69ef06ab33bca325d87531147c9d"' }>
                                        <li class="link">
                                            <a href="injectables/ActionRegistry.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionRegistry</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-e8d941e65ac25bc9c75139e04b978febbfd20ba1aa5c00213eeea50b51965bc9751784eda0138d104beaa7750f5870bbe602d5ccaf00be74b3936886bd81d9d1"' : 'data-bs-target="#xs-controllers-links-module-AppModule-e8d941e65ac25bc9c75139e04b978febbfd20ba1aa5c00213eeea50b51965bc9751784eda0138d104beaa7750f5870bbe602d5ccaf00be74b3936886bd81d9d1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e8d941e65ac25bc9c75139e04b978febbfd20ba1aa5c00213eeea50b51965bc9751784eda0138d104beaa7750f5870bbe602d5ccaf00be74b3936886bd81d9d1"' :
                                            'id="xs-controllers-links-module-AppModule-e8d941e65ac25bc9c75139e04b978febbfd20ba1aa5c00213eeea50b51965bc9751784eda0138d104beaa7750f5870bbe602d5ccaf00be74b3936886bd81d9d1"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e8d941e65ac25bc9c75139e04b978febbfd20ba1aa5c00213eeea50b51965bc9751784eda0138d104beaa7750f5870bbe602d5ccaf00be74b3936886bd81d9d1"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e8d941e65ac25bc9c75139e04b978febbfd20ba1aa5c00213eeea50b51965bc9751784eda0138d104beaa7750f5870bbe602d5ccaf00be74b3936886bd81d9d1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e8d941e65ac25bc9c75139e04b978febbfd20ba1aa5c00213eeea50b51965bc9751784eda0138d104beaa7750f5870bbe602d5ccaf00be74b3936886bd81d9d1"' :
                                        'id="xs-injectables-links-module-AppModule-e8d941e65ac25bc9c75139e04b978febbfd20ba1aa5c00213eeea50b51965bc9751784eda0138d104beaa7750f5870bbe602d5ccaf00be74b3936886bd81d9d1"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AreaModule.html" data-type="entity-link" >AreaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AreaModule-9a2c629d8077da0b130bb5a9ee7819cadc23b49da72540ca50bcb932c6e2524c8b8a28810048811c654843b8057a479fcd418b804d7bac574b5d14ecda19350a"' : 'data-bs-target="#xs-controllers-links-module-AreaModule-9a2c629d8077da0b130bb5a9ee7819cadc23b49da72540ca50bcb932c6e2524c8b8a28810048811c654843b8057a479fcd418b804d7bac574b5d14ecda19350a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AreaModule-9a2c629d8077da0b130bb5a9ee7819cadc23b49da72540ca50bcb932c6e2524c8b8a28810048811c654843b8057a479fcd418b804d7bac574b5d14ecda19350a"' :
                                            'id="xs-controllers-links-module-AreaModule-9a2c629d8077da0b130bb5a9ee7819cadc23b49da72540ca50bcb932c6e2524c8b8a28810048811c654843b8057a479fcd418b804d7bac574b5d14ecda19350a"' }>
                                            <li class="link">
                                                <a href="controllers/AreaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AreaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AreaModule-9a2c629d8077da0b130bb5a9ee7819cadc23b49da72540ca50bcb932c6e2524c8b8a28810048811c654843b8057a479fcd418b804d7bac574b5d14ecda19350a"' : 'data-bs-target="#xs-injectables-links-module-AreaModule-9a2c629d8077da0b130bb5a9ee7819cadc23b49da72540ca50bcb932c6e2524c8b8a28810048811c654843b8057a479fcd418b804d7bac574b5d14ecda19350a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AreaModule-9a2c629d8077da0b130bb5a9ee7819cadc23b49da72540ca50bcb932c6e2524c8b8a28810048811c654843b8057a479fcd418b804d7bac574b5d14ecda19350a"' :
                                        'id="xs-injectables-links-module-AreaModule-9a2c629d8077da0b130bb5a9ee7819cadc23b49da72540ca50bcb932c6e2524c8b8a28810048811c654843b8057a479fcd418b804d7bac574b5d14ecda19350a"' }>
                                        <li class="link">
                                            <a href="injectables/AreaReactionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AreaReactionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AreaRegistry.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AreaRegistry</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AreaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AreaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-8160586ce2d0b91d715744e566506b0274ca660e1a7fbf29e278633c603da300f48a995de19290d9d582297ec3cb65dead40714f45af1b1699d40271251b34b2"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-8160586ce2d0b91d715744e566506b0274ca660e1a7fbf29e278633c603da300f48a995de19290d9d582297ec3cb65dead40714f45af1b1699d40271251b34b2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-8160586ce2d0b91d715744e566506b0274ca660e1a7fbf29e278633c603da300f48a995de19290d9d582297ec3cb65dead40714f45af1b1699d40271251b34b2"' :
                                            'id="xs-controllers-links-module-AuthModule-8160586ce2d0b91d715744e566506b0274ca660e1a7fbf29e278633c603da300f48a995de19290d9d582297ec3cb65dead40714f45af1b1699d40271251b34b2"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-8160586ce2d0b91d715744e566506b0274ca660e1a7fbf29e278633c603da300f48a995de19290d9d582297ec3cb65dead40714f45af1b1699d40271251b34b2"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-8160586ce2d0b91d715744e566506b0274ca660e1a7fbf29e278633c603da300f48a995de19290d9d582297ec3cb65dead40714f45af1b1699d40271251b34b2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-8160586ce2d0b91d715744e566506b0274ca660e1a7fbf29e278633c603da300f48a995de19290d9d582297ec3cb65dead40714f45af1b1699d40271251b34b2"' :
                                        'id="xs-injectables-links-module-AuthModule-8160586ce2d0b91d715744e566506b0274ca660e1a7fbf29e278633c603da300f48a995de19290d9d582297ec3cb65dead40714f45af1b1699d40271251b34b2"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ElementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ElementService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GithubStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GithubStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MsStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MsStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceTokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceTokenService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SpotifyStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpotifyStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TwitchStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwitchStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigsModule.html" data-type="entity-link" >ConfigsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ElementModule.html" data-type="entity-link" >ElementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ElementModule-c47b9ed00c65ed10e6fb526481fc184ee18f35327be956435d55d7deeeaf77cb319f62d0f45c65f0046f1aad7d3addfc74b1899f0f297f537649a87ac45d6a6e"' : 'data-bs-target="#xs-controllers-links-module-ElementModule-c47b9ed00c65ed10e6fb526481fc184ee18f35327be956435d55d7deeeaf77cb319f62d0f45c65f0046f1aad7d3addfc74b1899f0f297f537649a87ac45d6a6e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ElementModule-c47b9ed00c65ed10e6fb526481fc184ee18f35327be956435d55d7deeeaf77cb319f62d0f45c65f0046f1aad7d3addfc74b1899f0f297f537649a87ac45d6a6e"' :
                                            'id="xs-controllers-links-module-ElementModule-c47b9ed00c65ed10e6fb526481fc184ee18f35327be956435d55d7deeeaf77cb319f62d0f45c65f0046f1aad7d3addfc74b1899f0f297f537649a87ac45d6a6e"' }>
                                            <li class="link">
                                                <a href="controllers/ElementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ElementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ElementModule-c47b9ed00c65ed10e6fb526481fc184ee18f35327be956435d55d7deeeaf77cb319f62d0f45c65f0046f1aad7d3addfc74b1899f0f297f537649a87ac45d6a6e"' : 'data-bs-target="#xs-injectables-links-module-ElementModule-c47b9ed00c65ed10e6fb526481fc184ee18f35327be956435d55d7deeeaf77cb319f62d0f45c65f0046f1aad7d3addfc74b1899f0f297f537649a87ac45d6a6e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ElementModule-c47b9ed00c65ed10e6fb526481fc184ee18f35327be956435d55d7deeeaf77cb319f62d0f45c65f0046f1aad7d3addfc74b1899f0f297f537649a87ac45d6a6e"' :
                                        'id="xs-injectables-links-module-ElementModule-c47b9ed00c65ed10e6fb526481fc184ee18f35327be956435d55d7deeeaf77cb319f62d0f45c65f0046f1aad7d3addfc74b1899f0f297f537649a87ac45d6a6e"' }>
                                        <li class="link">
                                            <a href="injectables/ElementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ElementService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrmModule.html" data-type="entity-link" >OrmModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ReactionRegistryModule.html" data-type="entity-link" >ReactionRegistryModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReactionRegistryModule-100c24fc4e056a904addc42a1ba361a08b52acaeca1516d4dff6d1b755bf1d4df26f46d7313d249ba9b2ce90d86f88446df24fcc117452455513d418c9bc8e5c"' : 'data-bs-target="#xs-injectables-links-module-ReactionRegistryModule-100c24fc4e056a904addc42a1ba361a08b52acaeca1516d4dff6d1b755bf1d4df26f46d7313d249ba9b2ce90d86f88446df24fcc117452455513d418c9bc8e5c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReactionRegistryModule-100c24fc4e056a904addc42a1ba361a08b52acaeca1516d4dff6d1b755bf1d4df26f46d7313d249ba9b2ce90d86f88446df24fcc117452455513d418c9bc8e5c"' :
                                        'id="xs-injectables-links-module-ReactionRegistryModule-100c24fc4e056a904addc42a1ba361a08b52acaeca1516d4dff6d1b755bf1d4df26f46d7313d249ba9b2ce90d86f88446df24fcc117452455513d418c9bc8e5c"' }>
                                        <li class="link">
                                            <a href="injectables/ReactionRegistry.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReactionRegistry</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServiceModule.html" data-type="entity-link" >ServiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ServiceModule-125a2f9b4635640d9ad72e7fa6231f8e364d5af7c54db1f213b5678acf1cd4f9ce0662fafd6f46ddbd19e48eaea61595c20e99e0bdbff858c138d9c213ac004e"' : 'data-bs-target="#xs-controllers-links-module-ServiceModule-125a2f9b4635640d9ad72e7fa6231f8e364d5af7c54db1f213b5678acf1cd4f9ce0662fafd6f46ddbd19e48eaea61595c20e99e0bdbff858c138d9c213ac004e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServiceModule-125a2f9b4635640d9ad72e7fa6231f8e364d5af7c54db1f213b5678acf1cd4f9ce0662fafd6f46ddbd19e48eaea61595c20e99e0bdbff858c138d9c213ac004e"' :
                                            'id="xs-controllers-links-module-ServiceModule-125a2f9b4635640d9ad72e7fa6231f8e364d5af7c54db1f213b5678acf1cd4f9ce0662fafd6f46ddbd19e48eaea61595c20e99e0bdbff858c138d9c213ac004e"' }>
                                            <li class="link">
                                                <a href="controllers/ServiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ServiceModule-125a2f9b4635640d9ad72e7fa6231f8e364d5af7c54db1f213b5678acf1cd4f9ce0662fafd6f46ddbd19e48eaea61595c20e99e0bdbff858c138d9c213ac004e"' : 'data-bs-target="#xs-injectables-links-module-ServiceModule-125a2f9b4635640d9ad72e7fa6231f8e364d5af7c54db1f213b5678acf1cd4f9ce0662fafd6f46ddbd19e48eaea61595c20e99e0bdbff858c138d9c213ac004e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ServiceModule-125a2f9b4635640d9ad72e7fa6231f8e364d5af7c54db1f213b5678acf1cd4f9ce0662fafd6f46ddbd19e48eaea61595c20e99e0bdbff858c138d9c213ac004e"' :
                                        'id="xs-injectables-links-module-ServiceModule-125a2f9b4635640d9ad72e7fa6231f8e364d5af7c54db1f213b5678acf1cd4f9ce0662fafd6f46ddbd19e48eaea61595c20e99e0bdbff858c138d9c213ac004e"' }>
                                        <li class="link">
                                            <a href="injectables/DictDataGithubService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DictDataGithubService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DictEmailsGmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DictEmailsGmailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DictEmailsOutlookService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DictEmailsOutlookService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GithubService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GithubService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MicrosoftService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MicrosoftService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceManager.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceManager</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceRegistry.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceRegistry</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceTokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceTokenService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SpotifyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpotifyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TwitchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwitchService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-ea5c8f4978e5f45e634bd671669da77386ec520d1eb0633ced81f146d3bad84c555413edf1ac9160398569bd65d6098d9ba118504ec91cfb3b5b5377ca542c0f"' : 'data-bs-target="#xs-injectables-links-module-UserModule-ea5c8f4978e5f45e634bd671669da77386ec520d1eb0633ced81f146d3bad84c555413edf1ac9160398569bd65d6098d9ba118504ec91cfb3b5b5377ca542c0f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-ea5c8f4978e5f45e634bd671669da77386ec520d1eb0633ced81f146d3bad84c555413edf1ac9160398569bd65d6098d9ba118504ec91cfb3b5b5377ca542c0f"' :
                                        'id="xs-injectables-links-module-UserModule-ea5c8f4978e5f45e634bd671669da77386ec520d1eb0633ced81f146d3bad84c555413edf1ac9160398569bd65d6098d9ba118504ec91cfb3b5b5377ca542c0f"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Area.html" data-type="entity-link" >Area</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AreaReaction.html" data-type="entity-link" >AreaReaction</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DictDataGithub.html" data-type="entity-link" >DictDataGithub</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DictEmailsGmail.html" data-type="entity-link" >DictEmailsGmail</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DictEmailsOutlook.html" data-type="entity-link" >DictEmailsOutlook</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Element.html" data-type="entity-link" >Element</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Service.html" data-type="entity-link" >Service</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ServiceToken.html" data-type="entity-link" >ServiceToken</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Action.html" data-type="entity-link" >Action</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActionDto.html" data-type="entity-link" >ActionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Area.html" data-type="entity-link" >Area</a>
                            </li>
                            <li class="link">
                                <a href="classes/AreaDto.html" data-type="entity-link" >AreaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAreaDto.html" data-type="entity-link" >CreateAreaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAreaReactionDto.html" data-type="entity-link" >CreateAreaReactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDictDataGithubDto.html" data-type="entity-link" >CreateDictDataGithubDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDictEmailsGmailDto.html" data-type="entity-link" >CreateDictEmailsGmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDictEmailsOutlookDto.html" data-type="entity-link" >CreateDictEmailsOutlookDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateElementDto.html" data-type="entity-link" >CreateElementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateServiceDto.html" data-type="entity-link" >CreateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateServiceTokenDto.html" data-type="entity-link" >CreateServiceTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reaction.html" data-type="entity-link" >Reaction</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReactionDto.html" data-type="entity-link" >ReactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Status.html" data-type="entity-link" >Status</a>
                            </li>
                            <li class="link">
                                <a href="classes/Token.html" data-type="entity-link" >Token</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BaseAction.html" data-type="entity-link" >BaseAction</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseArea.html" data-type="entity-link" >BaseArea</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseReaction.html" data-type="entity-link" >BaseReaction</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseService.html" data-type="entity-link" >BaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigsService.html" data-type="entity-link" >ConfigsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GithubActionIssueAssigned.html" data-type="entity-link" >GithubActionIssueAssigned</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GithubAuthGuard.html" data-type="entity-link" >GithubAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GithubRepositoryStarred.html" data-type="entity-link" >GithubRepositoryStarred</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GmailActionEmailDeleted.html" data-type="entity-link" >GmailActionEmailDeleted</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GmailActionEmailReceived.html" data-type="entity-link" >GmailActionEmailReceived</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GmailActionEmailSent.html" data-type="entity-link" >GmailActionEmailSent</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GmailReactionDeleteEmail.html" data-type="entity-link" >GmailReactionDeleteEmail</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GmailReactionFlagEmail.html" data-type="entity-link" >GmailReactionFlagEmail</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GmailReactionSendEmail.html" data-type="entity-link" >GmailReactionSendEmail</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthGuard.html" data-type="entity-link" >GoogleAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MsAuthGuard.html" data-type="entity-link" >MsAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OutlookActionEmailDeleted.html" data-type="entity-link" >OutlookActionEmailDeleted</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OutlookActionEmailReceived.html" data-type="entity-link" >OutlookActionEmailReceived</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OutlookActionEmailSent.html" data-type="entity-link" >OutlookActionEmailSent</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OutlookReactionDeleteEmail.html" data-type="entity-link" >OutlookReactionDeleteEmail</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OutlookReactionFlagEmail.html" data-type="entity-link" >OutlookReactionFlagEmail</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OutlookReactionSendEmail.html" data-type="entity-link" >OutlookReactionSendEmail</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpotifyAuthGuard.html" data-type="entity-link" >SpotifyAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TwitchAuthGuard.html" data-type="entity-link" >TwitchAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});