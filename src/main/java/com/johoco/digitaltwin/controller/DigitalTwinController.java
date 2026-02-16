package com.johoco.digitaltwin.controller;

import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/digital-twin")
public class DigitalTwinController {

    public record ChatRequest(String message) {}
    public record ChatGenerationResponse(String generation) {}
    public record StatusResponse(String status) {}

    private final OllamaChatModel chatModel;

    public DigitalTwinController(OllamaChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping
    public Mono<StatusResponse> getDigitalTwinStatus() {
        return Mono.just(new StatusResponse("Digital Twin Service is running"));
    }

    @GetMapping("/health")
    public Mono<StatusResponse> healthCheck() {
        return Mono.just(new StatusResponse("OK"));
    }

    @PostMapping("/ai/generate")
    public ChatGenerationResponse generate(@RequestBody ChatRequest request) {
        String message = (request.message() == null || request.message().isBlank())
                ? "Tell me a joke" : request.message();
        return new ChatGenerationResponse(this.chatModel.call(message));
    }

    @PostMapping(value = "/ai/generateStream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> generateStream(@RequestBody ChatRequest request) {
        String message = (request.message() == null || request.message().isBlank())
                ? "Tell me a joke" : request.message();
        Prompt prompt = new Prompt(new UserMessage(message));
        return this.chatModel.stream(prompt)
                .map(response -> {
                    if (response.getResult() != null
                            && response.getResult().getOutput() != null
                            && response.getResult().getOutput().getText() != null) {
                        return response.getResult().getOutput().getText();
                    }
                    return "";
                })
                .filter(text -> !text.isEmpty());
    }
}
